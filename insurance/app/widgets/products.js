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

            view
                .clear(container)
                .append(container, model.select(id, region));
        }

        function refresh(data) {
            region = data;

            view.clear(container);
        }

        bus
            .on('value:changed', change)
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);;
    };

});