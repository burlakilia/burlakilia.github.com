define(function (require, exports) {
    'use strict';

    require('mustache');
    require('ui');

    var bus = require('bus');

    exports.create = function (container) {
        var options;

        function nearest(value) {
            var length = options.length,
                selected = Math.floor(value * length / 100);


            return options[selected];
        }

        function onchange(e, data) {
            var value = data.value;

            options = options || container.data('options');
            container.trigger('updated',  [ nearest(value).id ]);
        }

        function onrefresh(e, data) {
            options = data;
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
        }

        bus.on('value:changed', update)

        container
            .on('refresh', onrefresh)
            .on('slidestop', onchange);

        container.slider();
    };

});