define(function (require, exports) {
    "use strict";

    var bus = require('bus'),
        table =  require('views/table');

    var list = [], location, region;

    exports.create = function (container) {

        function render() {

            table
                .clear(container)
                .append(container, list, location);

        }

        function add(item) {
            var i, max;

            if (list.length > 3) {
                return;
            }

            for (i = 0, max = list.length; i < max; i++) {

                if (item.id === list[i].product.id) {
                    return;
                }

            }

            var options = {
                'interior' :  $('select[data-args="interior"]').find(':selected').text(),
                'movables' :  $('select[data-args="movables"]').find(':selected').text(),
                'liability' :  $('select[data-args="liability"]').find(':selected').text()
            };

            list.push({
                name: item.name,
                product: item,
                totalcost: $('.total-summ.all').text().replace('р.',''),
                options: options,
                price: $('.total-summ.price').text().replace('р.','')
            });

            render();
        }

        function remove(id) {

            function check(node) {
                return node.product.id !== id
            }

            list = list.filter(check);
            render();
        }

        function refresh(id, name) {
            region = id;
            location = name;
            list = [];

            table.clear(container)
        }

        bus
            .on('compare:add', add)
            .reemit('compare:add', add)
            .on('compare:remove', remove)
            .reemit('compare:remove', remove);

        bus
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);
    };

});