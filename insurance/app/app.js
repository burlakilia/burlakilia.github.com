define(['exports', 'jquery',
    'widgets/options',
    'widgets/select',
    'widgets/regions',
    'widgets/products',
    'widgets/slider',
    'models/options',
    'models/products',
    'views/products',
    'views/select'], function (exports, $)  {

    function init() {
        $('[data-link]').each(render);
    }

    function render(i, node) {
        var link = node.getAttribute('data-link'),
            args = node.getAttribute('data-args') || '';

        args = args.split(',');

        require([link], function(widget) {
            args.unshift($(node));
            widget.create.apply(this, args);
        });

    }

    exports.init = init;
});