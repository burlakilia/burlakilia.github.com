define(function (require, exports) {
    "use strict";

    require('jquery-ui');

    var bus = require('bus'),
        config = require('config'),
        view = require('../views/autocomplete');

    var DEFAULT = "07f2f6aa-8837-4606-ae9e-66acc0678623";

    exports.create = function (container) {

        require(['json!' + config.locations.url], function (data) {

            function onselect(e, data) {
                bus.emit('region:changed', data.item.id,  data.item.label);
            }

            function render( ul, item ) {
                return $(view.render(item)).appendTo( ul );
            }

            function change() {
                var len, i;

                for (i = 0, len = data.length; i < len; i++) {

                    if (data[i].id === DEFAULT) {
                        container.val(data[i].label)
                        break;
                    }

                }

                bus.emit('region:changed', data[i].id, data[i].label);
            }

            bus
                .on('app:ready', change)
                .reemit('app:ready', change);

            container
                .toggleClass('loading', false)
                .autocomplete({
                    source: data,
                    select: onselect
                })


            // change select list template see  http://jqueryui.com/autocomplete/#custom-data
            container.data('ui-autocomplete')._renderItem = render;
        });

    };

});