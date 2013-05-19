define(function (require, exports) {
    "use strict";

    var bus = require('bus'),
        view = require('views/select'),
        model = require('models/options');

    exports.create = function (container, id) {
        var opened = false, handler;

        function refresh(region) {
            var old = container.val();

            model.select(id, region, function(err, data){

                if (err) {
                    throw err;
                }

                view.clear(container);
                view.append(container, data);

                container.trigger('update',  [ data[0].id ]);
            });

            old && reuse(old);
            container.toggleClass('loading', false);
        }

        function reuse(v) {
            handler && clearTimeout(handler);

            handler = setTimeout(function() {
                container.val(v).trigger('change');
            }, 200)
        }

        function update(id) {
            container.val(id);
        }

        function onchange() {
            container.trigger('update',  [ container.val()]);
        }

        function onclick() {
            opened = !opened;

            var ct = container.find('option:selected').index();

            container
                .toggleClass('open', opened)
                .css('offset', ct + 'px');

        }

        bus
            .on('value:changed', update)
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);

        container
            .on('change', onchange)
            .on('click', onclick);
    };

});