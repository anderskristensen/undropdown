$(function() {
    var options = {
        values: [
                { name: "Antique Patina on Rust", colors: [ "606657", "cfc698", "a38267", "8f5544", "6b2e28" ]},
                { name: "Bunch of Colors", colors: [ "948e2a", "d48d35", "b86834", "853c2c", "592b27" ]},
                { name: "For Maria", colors: [ "2e2e38", "5e5f69", "787577", "8f8b81", "bfb184" ]},
                { name: "Lush Fruit", colors: [ "b2461d", "ad6901", "6b9e15", "009155", "005440" ]},
                { name: "Shaker salt", colors: [ "4f443a", "7f8e98", "b2cbd9", "e5eef5", "efdaad" ]},
                { name: "Son", colors: [ "cc6b32", "ffab48", "ffe7ad", "a7c9ae", "888a63" ]},
                { name: "Times Changing", colors: [ "332532", "644d52", "f77a52", "ff974f", "a49a87" ]},
                { name: "Wheel Of Fortune", colors: [ "c7ad30", "de7721", "c23818", "851614", "5c0e2f" ]},
                { name: "archi02", colors: [ "513f33", "7b7754", "98a36b", "a8af8e", "c1bdba" ]},
                { name: "gaeulich", colors: [ "788d99", "c3c9cc", "86d3ff", "47bbff", "0e84cc" ]},
                { name: "icing on the cake", colors: [ "695a57", "7aa184", "b8cc85", "ffc782", "f28b50" ]},
                { name: "johnny cash", colors: [ "4a350a", "b2720d", "ffd870", "e8c95a", "302c15" ]},
                { name: "lemon light", colors: [ "918b61", "adc482", "c6f2a2", "ffd1a1", "dbc500" ]},
                { name: "summer madness", colors: [ "D8FF6C", "CEF094", "A8D99F", "98BFB0", "8DA8B5" ]}
            ],
        selected: 0,
        equals: function(obj1, obj2) {
            return obj1.name == obj2.name;
        },
        toHtml: function() { // renders values as HTML
            var s = '<span class="palette">';
            for (var i = 0; i < this.colors.length; i++) {
                s += '<i style="background-color:#' + this.colors[i] + ';"></i>';
            }
            s += '</span>';
            return s;
        },
        change: function(event, selected) {
            console.log("change: new selection: " + selected.name);
        }
    };

    var paletteChooser = $("#paletteChooser").undropdown(options).data("undropdown");
    
    // bind an event handler (could have been done through the options)
    $("#paletteChooser").bind("undropdownchange", function(event, selected) {
        $("#paletteName").text(selected.name);
    });
    if (paletteChooser.val()) {
        $("#paletteName").text(paletteChooser.val().name);
    }
});
