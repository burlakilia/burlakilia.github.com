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

        function noop(){
            return false;
        }

        container
            .on('click', '.compare-link.active a', open)
            .on('click', '.compare-link.disable a', noop)
            .on('click', '.close-overlay', close)
			.on('click', '.overlay', close);
    };

});