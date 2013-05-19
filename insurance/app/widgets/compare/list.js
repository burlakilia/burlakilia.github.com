define(function (require, exports) {
    "use strict";

    var bus = require('bus'),
        view =  require('views/compare');

    var list = [];

    exports.create = function (container) {

        function render() {

            view
                .clear(container)
                .append(container, list);

        }

        function add(item) {
            var i, max;

            if (list.length > 3) {
                return;
            }

            for (i = 0, max = list.length; i < max; i++) {

                if (item.id === list[i].id) {
                    return;
                }

            }

            list.push(item);
            render();
        }

        function remove(id) {

            function check(node) {
                return node.id !== id
            }

            list = list.filter(check);
            render();
        }

        function refresh() {
            view.clear(container);
            list = [];
        }

        bus
            .on('compare:add', add)
            .reemit('compare:add', add)
            .on('compare:remove', remove)
            .reemit('compare:remove', remove);

        bus.on('region:changed', refresh);
    };

});