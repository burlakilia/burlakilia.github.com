define(function (require, exports) {
    "use strict";

    var bus = require('bus'),
        view = require('views/select');

    exports.create = function (container) {

        function onchange() {
            container.trigger('updated', [ this.value ]);
        }

        function onrefresh(e, options) {

            view
                .clear(container)
                .append(container, options || container.data('options'));

            container.toggleClass('loading', false);
        }

        function update(id) {
            container.val(id);
        }

        bus.on('value:changed', update)

        container
            .on('change', onchange)
            .on('refresh', onrefresh);
    };

});