define(function (require, exports) {
    "use strict";

    exports.create = function (container) {

        function open() {
            container.toggleClass('compare-active', true);
            return false;
        }

        function close() {
            container.toggleClass('compare-active', false);
            return false;
        }

        container
            .on('click', '.compare-link a', open)
            .on('click', '.close-overlay', close)
			.on('click', '.overlay', close);
    };

});