define(function (require, exports) {
    "use strict";

    var bus = require('bus');

    exports.create = function (container) {

        function onclick() {
            bus.emit('compare:remove', container.attr('data-id'));
            return false;
        }

        container.on('click', onclick);
    };

});