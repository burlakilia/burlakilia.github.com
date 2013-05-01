define(['json!/data.json', 'libs/query', 'exports'], function (data, query, exports) {
    "use strict";

    exports.select = function(id, region) {
        var ret = query('$..products[0].product[?id="' + id + '"]', data).map(function(obj){

            var price = query('$.region[?id="' + region + '"]', obj);

            return {
                id: obj.id,
                name: obj.name,
                company: obj.company,
                price: price
            };

        });

        return ret;
    }


});