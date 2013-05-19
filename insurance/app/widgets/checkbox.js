define(function (require, exports) {
	"use strict";

	exports.create = function (container) {
		container.find('input[type=checkbox]').click(function () {
			(this.checked)? container.addClass("active"):container.removeClass("active");
		});
	};

});