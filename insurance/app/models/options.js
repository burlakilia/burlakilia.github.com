define(function (require, exports) {
    "use strict";

    var data = require('json!data.json'),
        query = require('libs/query');

    var region;

    function sort(a, b) {
        return +a.value - +b.value;
    }

    exports.select = function(id, region, done) {
        var ret = query('$..option[0][?id="' + id + '"][0].values.value', data).map(function(obj) {

            var val = query('$.region[?id="' + region + '"]', obj);

            return {
                id: obj.id,
                value: val[0].value
            };
        });

        setTimeout(function() {
            done(null, ret.sort(sort));
        }, 100);
    }

});