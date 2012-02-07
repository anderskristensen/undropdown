/* Building custom jQuery UI widget:
 *   http://wiki.jqueryui.com/w/page/12138135/Widget%20factory
 * 
 * This menu widget is (loosely) based on:
 *   http://www.jankoatwarpspeed.com/post/2009/07/28/reinventing-drop-down-with-css-jquery.aspx
 * 
 * TODO avoid resizing when smaller/bigger element selected, fix the size of the dt - maybe compute based on elements
 * TODO when expanded, a click in the non-<a> part of the <dt> will not result in _hide()
 * TODO _show() on mouse down and allow selection to be made on the same click (currently two clicks are needed to make selection)
 * TODO Add "selected" class to currently selected <li>; style it to stand out
 * TODO handle setting of options after initialization
 * TODO replace individual click handlers with single one on dropdown itself [optimization]
 * 
 * @author Anders Kristensen
 */

(function($) {
    $.widget("unreserved.undropdown", {
 
    // These options will be used as defaults
    options: {
    	equals: function(obj1, obj2) {
    		return obj1 == obj2;
    	},
    	values: [  ],
    	selected: -1
    },
 
    // Set up the widget
    _create: function() {
        this.element.addClass("undropdown ui-widget"); //XXX ui-state-default screws layout up

        this.element.html("<span class='selected'><a href='#'><em>select a value</em> &#x25bc;</a></span>");
        //this.element.prepend("<dt><a href='#'>- select -<span class=\"value\"></span><span class='ui-icon ui-icon-triangle-1-s'></span></a></dt>");
        this.element.append("<ul class='ui-widget-content'></ul>");
        
        this.element.find(".selected > a").addClass("ui-state-default ui-corner-all");

        // add default values
        if ($.isArray(this.options.values)) {
        	this.addAll(this.options.values, this.options.selected);
        }

        var self = this;

        this.element.find(".selected > a").click(function(event) {
    		self._toggle();
    		event.preventDefault();
    	});
    	
        this.element.find(".selected > a, ul > li > a").live("hover", function() {
    		$(this).toggleClass("ui-state-hover");
    	});

    	this.element.find("ul li a").live("click", function(event) {
    		self.select($(this).parent().data("value"));
    		event.preventDefault();
    	});

    	$(document).bind('click', function(e) {
    		var $clicked = $(e.target);
    		if (! $clicked.parents().hasClass("undropdown")) {
        		self._hide();
    		}
    	});
    },

    _isVisible: function() {
    	return this.element.find(".selected > a").hasClass("ui-state-active");
    },
    
    _toggle: function() {
    	if (this._isVisible()) {
    		this._hide();
    	} else {
    		this._show();
    	}
    },
    
    _show: function() {
        var height = this.element.find(".selected").height();
        if (height !== undefined && height) {
        	console.log("height=" + height);
            this.element.find("ul").css("top", height+1);
        }
        
    	this.element.find(".selected > a").addClass("ui-state-active");
    	this.element.find("ul").show();
    },

    _hide: function() {
    	this.element.find(".selected > a").removeClass("ui-state-active");
    	this.element.find("ul").hide();
    },

    empty: function() { // TODO
    },
    
    add: function(obj, selected) {
    	var html = obj.html;
    	if (!html) {
    		var toHtml = obj.toHtml || this.options.toHtml;
    		if (toHtml) html = toHtml.call(obj);;
    	}
    	if (!html) return false;
    	$item = $("<li><a href='#'>" + html + "</a></li>").data("value", obj);
    	this.element.find("ul").append($item); //TODO make sure <ul> in child content not selected
    	if (selected) this.select(obj);
    	return true;
    },
    
    addAll: function(ary, selected) {
    	for (var i = 0; i < ary.length; i++) {
    		this.add(ary[i], (i === selected));
    	}
    },
    
    load: function(url) {
        var self = this;
    	$.getJSON(url, function(ary) {
    		self.empty();
    		self.addAll(ary, 0);
    	});
    },
    
    // TODO rename val(obj) to align with jQuery common usage?
    select: function(obj) {
    	var self = this;
    	var li = this._findListItem(obj);
    	if (li) {
            var value = $(li).data("value");
    		var html = $(li).find("a").html();
    		$(self.element).data("value", value); //XXX was: s/value/obj/
    		$(self.element).find(".selected a").html(html + " &#x25bc;");

    		self._hide();

    		self._trigger("change", undefined, value);
    		return true;
    	}
		return false;
    },
    
    /**
     * Returns DOM "<li>" object with the specified value or null if no such
     * list item exists in this dropdown.
     */
    _findListItem: function(obj) {
    	var self = this;
    	var result = undefined;
    	this.element.find("li").each(function(i, li) { //TODO make sure <ul> in child content not selected
    		if (self.options.equals($(li).data("value"), obj)) {
    			result = li;
    			return false;
    		}
    	});
    	return result;
    },

    val: function() {
    	return this.element.data("value");
    },
    
    contains: function(obj) {
    	return this._findListItem(obj) !== undefined;
    },

    // Use the _setOption method to respond to changes to options
    _setOption: function(key, value) {
      switch (key) {
        case "clear":
          // handle changes to clear option
          break;
      }
 
      // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
      $.Widget.prototype._setOption.apply(this, arguments);
      // In jQuery UI 1.9 and above, you use the _super method instead
      this._super("_setOption", key, value);
    },
 
    // Use the destroy method to clean up any modifications your widget has made to the DOM
    destroy: function() {
        this.element.removeClass("ui-widget undropdown");

        // remove previously added DOM elements
        this.element.empty();

        // unbind any event handlers that may still exist (OK, in this case none)
        this.element.find("a").unbind(".usermgmt");

        // In jQuery UI 1.8, you must invoke the destroy method from the base widget
        // Does nice things like unbind all namespaced events on the original element
        $.Widget.prototype.destroy.call(this);
        // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
    }
  });
}(jQuery));
