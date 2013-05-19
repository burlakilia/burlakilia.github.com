define(function (require, exports) {
    "use strict";

    var $ = require('jquery'),
        bus = require('bus'),
        view = require('views/select'),
        model = require('models/options');

    exports.create = function (container, id) {
        var opened = false, handler;

        function refresh(region) {
            var old = container.find('li.active').attr('data-value');

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
                update(v);
                container.trigger('update', [ v ]);
            }, 200)
        }

        function update(id) {
            select(container.find('.item[data-value="' + id + '"]'));
        }

        function open() {
            opened = !opened;
            container.toggleClass('open', opened);
        }

        function onclick() {
            var node = $(this);

            select(node);

            if (opened) {
                node.attr('data-value') && container.trigger('update', [ node.attr('data-value') ]);
            }

        }

        function select(node) {
            var offset;

            container
                .attr('data-value', node.text())
                .find('.item').toggleClass('active', false);

            node.toggleClass('active', true);
            offset = container.find('li.active').index() * -30;

            container.find('.select-data').css('top', offset + 'px')
        }

        function check(e) {

            if ($(e.target).attr('data-args') === container.attr('data-args') ||
                $(e.target).parent().parent().attr('data-args') === container.attr('data-args')) {

                opened = !opened;
            } else {
                opened = false;
            }


            container.toggleClass('open', opened);
        }

        bus
            .on('value:changed', update)
            .on('region:changed', refresh)
            .reemit('region:changed', refresh);

        $(document).click(check);

        container.on('click', '.item', onclick);
    };

});