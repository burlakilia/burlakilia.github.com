define(function (require, exports) {
    "use strict";

    require('mustache');

    var bus = require('bus'),
        view = require('views/products'),
        model = require('models/products');

    exports.create = function (container) {
        var region;


        function change(id){

            if (!region) {
                return;
            }

            model.select(id, region, function(err, products) {

                if (err) {
                    return;
                }

                view
                    .clear(container)
                    .append(container, products);

            });

        }

        function refresh(data) {
            region = data;

            view.clear(container);
        }

        bus
            .on('value:changed', change)
            .reemit('value:changed', change)
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);;
    };

});