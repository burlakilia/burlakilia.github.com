define(function (require, exports) {
    "use strict";

    var bus = require('bus'),
        config = require('config');

    exports.create = function (container) {

        function change(id) {
            var node = container.find('.region[data-id="' + id + '"]');

            container.find('.region').removeClass('active');
            node.toggleClass('active',true);
        }

        bus.on('region:changed', change);
    };

});