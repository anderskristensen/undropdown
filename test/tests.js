(function() {
    // values are objects with 'id' and 'name' attributes
    var values1 = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Carol" }
    ];
    var values2 = [
        { id: 4, name: "Dwight" },
        { id: 5, name: "Eric" }
    ];
    function equals(obj1, obj2) {
        return obj1.id == obj2.id;
    }
    function toHtml() {
        return "<span>" + this.id + ": " + this.name + "</span>";
    }


    QUnit.config.reorder = false;
    QUnit.init();


    //////////////////////////////////////////////////////////////////////

    module("No Initial values");

    test("Initial value", function() {
        var dd1 = $("#dd1").undropdown({
            equals: equals,
            toHtml: toHtml
        }).data("undropdown");
        var dd1Selected;

        $("#dd1").bind("undropdownchange", function(event, selected) {
            dd1Selected = selected;
        });

        ok(dd1, 'widget was created');
        ok(dd1.val() === undefined, "widget has no value");
        ok(dd1.select(values1[0]) === false, "setting value to first entry fails");
        ok(!dd1.contains(values1[0]), "widget doesn't contain first value");
        ok(dd1.val() === undefined, "value was not set");

        dd1.addAll(values1);
        ok(dd1.val() === undefined, "widget still has no value");

        ok(dd1.select(values1[0]) === true, "setting value to first entry succeeds");
        ok(dd1.val() === values1[0], "val() returns first entry");
        ok(dd1Selected === values1[0], "bind() listener was invoked");
        ok(dd1.contains(values1[2]), "widget contains() third value");
        dd1Selected = undefined;
        ok(dd1.select("humbug") === false, "setting value to invalid value fails");
        ok(dd1.val() === values1[0], "failed select() didn't change widget value");
        ok(dd1Selected === undefined, "bind() listener not invoked on failed select()");

        ok(!dd1.contains(values2[1]), "widget doesn't contain values2[1]");
        dd1.addAll(values2);
        ok(dd1.contains({id:5}), "widget contains() newly added value");
        ok(dd1.val() === values1[0], "adding values didn't change widget value");
        ok(dd1.select(values2[1]) === true, "setting value to first entry succeeds");
        ok(dd1.val() === values2[1], "value is values2[1]");
    });


    //////////////////////////////////////////////////////////////////////
    
    module("Initial values, change listener");

    test("No initial value", function() {
        var dd2Selected = undefined;
        var dd2 = $("#dd2").undropdown({
            equals: equals,
            toHtml: toHtml,
            values: values1,
            change: function(event, selected) {
                dd2Selected = selected;
            }
        }).data("undropdown");

        ok(dd2, 'widget was created');
        ok(dd2.val() === undefined, "widget has no value");

        var val = { id: 1, name: "not Alice" };
        ok(dd2.select(val) === true, "setting value to something equals() to first entry succeeds");
        ok(equals(dd2.val(), values1[0]), "widget value set to first entry");
        ok(equals(dd2Selected, values1[0]), "change() fct in options was invoked");
    });


    //////////////////////////////////////////////////////////////////////
    
    module("Initial values, selected set");

    test("No initial value", function() {
        var dd3 = $("#dd3").undropdown({
            equals: equals,
            toHtml: toHtml,
            values: values1,
            selected: 1
        }).data("undropdown");

        ok(equals(dd3.val(), values1[1]), "initial value is set");
    });
})();