define(function (require, exports) {
    "use strict";

    var $ = require('jquery'),
        bus = require('bus');

    exports.create = function (container) {

        function select(node) {
            var  id = node.attr('data-id');

            container.find('.region').removeClass('active');
            node.toggleClass('active',true);

            bus.emit('region:changed', id);
        }

        function onclick() {
            select($(this));
        }

        select(container.find('.region').first());

        container.on('click', '.region', onclick);
    };

});