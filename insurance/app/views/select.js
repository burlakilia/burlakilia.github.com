define(function (require, exports) {
    "use strict";

    require('mustache');

    var template = require('text!/app/templates/select.html');

    exports.clear = function(container) {
        container.empty();

        return exports;
    };

    exports.append = function (container, data) {
        container.append(Mustache.to_html(template, { options: data }));

        return exports;
    };

});