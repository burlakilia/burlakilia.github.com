define(function (require, exports) {
    "use strict";

    require('mustache');

    var accounting = require('accounting'),
        template = require('text!../../templates/compare.html');

    function format(obj){

        obj.totalcost = accounting.formatMoney(+obj.totalcost, "", 0, " ", " ");
        obj.price.value = accounting.formatMoney(+obj.price.value, "", 0, " ", " ");

        return obj;
    }


    exports.clear = function(container) {
        container.empty();

        return exports;
    };

    exports.append = function (container, data) {
        var html = $(Mustache.to_html(template, { products: data.map(format),  exists: data.length > 0, one: data.length === 1  }));

        window.renderWidgets(html, function() {
            container.append(html);
        });

        return exports;
    };

    exports.render = function(data) {
        return Mustache.to_html(template, data);
    };

});