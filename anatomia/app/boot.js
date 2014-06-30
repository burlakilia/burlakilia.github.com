define(['jquery'], function() {

	$('[data-widget]').each(function() {
		var node = $(this),
			args = node.attr('data-args') || [],
			path = './app/' + node.attr('data-widget') + '.js';

		args.unshift(node);

		require([path], function(module) {
			module.create.apply(module, args);
		})

	})
});