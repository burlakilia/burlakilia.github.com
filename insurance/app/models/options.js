define(function (require, exports) {
    "use strict";

    var config = require('config'),
        query = require('libs/query');

    var region, data;

    function sort(a, b) {
        return +a.value - +b.value;
    }

    exports.select = function(id, region, done) {

        function find(res) {

            if (!res) {
                return;
            }

            data = res;

            var ret = query('$..option[0][?id="' + id + '"][0].values.value', data).map(function(obj) {

                var val = query('$.region[?id="' + region + '"]', obj);

                return {
                    id: obj.id,
                    value: val[0].value
                };

            });

            done(null, ret.sort(sort));
        }

        if (!data) {
            require(['json!' + config.data.url], find);
            return;
        }

        find(data);
    }

});