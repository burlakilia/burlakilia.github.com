define(function (require, exports) {
    "use strict";

    require('mustache');

    var template = require('text!templates/products.html');

    exports.clear = function(container) {
        container.empty();

        return exports;
    };

    exports.append = function (container, data) {
        container.append(Mustache.to_html(template, { products: data }));

        return exports;
    };

});