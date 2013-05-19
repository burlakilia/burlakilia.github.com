define(function (require, exports) {
    'use strict';

    require('mustache');
    require('jquery-ui');
    require('jquery-touch');

    var bus = require('bus'),
        model = require('models/options');

    exports.create = function (container, id) {
        var options;

        function nearest(value) {
            var length = options.length,
                selected = Math.floor(value * length / 100);

            return options[selected];
        }

        function onchange(e, data) {
            var value = data.value !== 100 ? data.value : 98;

            options = options;
            container.trigger('update',  [ nearest(value).id ]);
        }

        function refresh(region) {

            model.select(id, region, function(err, data){
                var min, max;

                if (err) {
                    throw err;
                }

                min = data[0];
                max = data[data.length - 1];

                options = data;

                extreme(min, max);
                label();
            });

        }

        function label() {

            setTimeout(function() {
                var val = container.parent().parent().find('.select .item.active').text();

                //container.find('.ui-slider-handle').attr('hidefocus', 'true').html('<span class="ui-slider-handle-count">' + val + '</span>')
            }, 0);

        }

        function extreme(min, max) {
            var node = container.parent();

            min = min.value / 1000;
            min = min + ' тыс.';

            max = max.value / 1000;
            max = max + ' тыс.';

            node.find('.ui-slider-min-count').text(min);
            node.find('.ui-slider-max-count').text(max);
        }

        function update(id) {

            if (!options){
                return;
            }

            for (var i = 0; i < options.length; i++) {
                if (options[i].id === id) {
                    break;
                }
            }

            var selected = Math.floor(i * 100 / options.length);

            container.slider('value', selected);
            label();
        }

        bus
            .on('value:changed', update)
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);

        container
            .on('slidestop', onchange)
            .slider();

        container.draggable();

        container.on('update', label);
    };

});