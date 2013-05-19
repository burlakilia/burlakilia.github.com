define(function (require, exports) {
    "use strict";

    require('mustache');

    var accounting = require('accounting'),
        template = require('text!../../templates/select.html');

    function format(obj){
        obj.value = accounting.formatMoney(+obj.value, "", 0, " ", " ");

        return obj;
    }

    exports.clear = function(container) {
        container.empty();

        return exports;
    };

    exports.append = function (container, data) {
        container.append(Mustache.to_html(template, { options: data.map(format) }));

        return exports;
    };

});