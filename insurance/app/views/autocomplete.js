define(function (require, exports) {
    "use strict";

    require('mustache');

    var template = require('text!../../templates/autocomplete.html');

    exports.clear = function(container) {
        container.empty();

        return exports;
    };

    exports.append = function (container, data) {
        container.append(Mustache.to_html(template, data));

        return exports;
    };

    exports.render = function(data) {
        return Mustache.to_html(template, data);
    };

});