define(function (require, exports) {
    "use strict";

    var bus = require('bus'),
        model = require('models/options');

    exports.create = function (container, id) {
        var select = container.find('select'),
            slider = container.find('.slider .widget');

        function refresh(region) {

            model.select(id, region, function(err, data){
                select.trigger('refresh', [ data ]).data('options', data);
                slider.trigger('refresh', [ data ]).data('options', data);

                bus.emit('value:changed', select.val());
            });

        }

        function emit(e, value) {
            bus.emit('value:changed', value);
        }

        container.on('updated', 'select, .slider .widget', emit);

        bus
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);
    };

});