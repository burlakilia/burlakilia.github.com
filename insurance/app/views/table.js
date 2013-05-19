define(function (require, exports) {
    "use strict";

    require('mustache');

    var $ = require('jquery'),
        accounting = require('accounting'),
        template = require('text!../../templates/table.html');

	function hover(container) {
		container.find("td")
			.mouseover(function() {
				var tds = $( this ).parent().find("td"),
					index = $.inArray( this, tds );
				container.find("td:nth-child("+( index + 2 )+")").css("background-color", "#eee");
				container.find(".thead td:nth-child("+( index + 2 )+")").css("background-color", "#bde1ee");
				container.find(".first-tf td:nth-child("+( index + 2 )+")").css("color", "#00b5ff");
				container.find(".tfoot td:nth-child("+( index + 2 )+") .buy-link").css("background-color", "#00b8fb");
			})
			.mouseout(function() {
				var tds = $( this ).parent().find("td"),
					index = $.inArray( this, tds );
				container.find("td:nth-child("+( index + 2 )+")").css("background-color", "transparent");
				container.find(".thead td:nth-child("+( index + 2 )+")").css("background-color", "#cbf1ff");
				container.find(".first-tf td:nth-child("+( index + 2 )+")").css("color", "#333");
				container.find(".tfoot td:nth-child("+( index + 2 )+") .buy-link").css("background-color", "#7bd9ff");
			});
		return container;
	}

    exports.clear = function(container) {
        container.empty();

        return exports;
    };

    exports.append = function (container, data, location) {
        var html = $(Mustache.to_html(template, { products: data, exists: data.length > 0, location: location  }));
		html = hover(html);
        window.renderWidgets(html, function() {
            container.append(html);
        });

        return exports;
    };

});