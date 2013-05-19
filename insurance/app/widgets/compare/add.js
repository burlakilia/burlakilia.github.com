define(function (require, exports) {
    "use strict";

    var bus = require('bus'),
        model = require('models/products');

    var current, region;

    exports.create = function (container) {

        function refresh(res) {
            region = res;
        }

        function change(id) {
            current = id;
        }

        function onclick() {

            model.select(current, region, function(err, product) {

                if (err) {
                    return;
                }

                bus.emit('compare:add', product[0], product.totalcost);
            });

            return false;
        }

        container.on('click', onclick);

        bus
            .on('value:changed', change)
            .reemit('value:changed', change)
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);;
    };

});