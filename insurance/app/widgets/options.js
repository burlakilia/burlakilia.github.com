define(function (require, exports) {
    "use strict";

    var bus = require('bus');

    exports.create = function (container) {
        var handler;

        function emit(e, value) {

            handler && clearTimeout(handler);

            handler = setTimeout(function() {
                bus.emit('value:changed', value);
            }, 0);

        }

        function refresh() {
            var value = container.find('.select .item').first().val();

            bus.emit('value:changed', value);
        }

        container.on('update', '.select, .slider .widget', emit);

        bus
            .on('app:ready', refresh)
            .reemit('app:ready', refresh);
    };

});