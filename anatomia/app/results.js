define(function(require, exports) {

	var mustache = require('mustache'),
		template = '<h3>Результат</h3><ul>{{#answers}}<li>{{text}}, <b>Правильно</b>: {{correctVariant}}, <b>Твой ответ</b>: {{userAnswerText}}</li>{{/answers}}</ul><div>Всего ошибок: {{count}}. <br/> Итог: {{rate}}% </div>';

	exports.create = function(node){

		function show(e, answers) {
			var falls = answers.filter(function(a) { return !a.isCorrect; });

			falls = falls.map(function(a) {
				a.correctVariant = a.variants.filter(function(c) { return a.correct === c.key})[0].value;
				a.userAnswerText = a.variants.filter(function(c) { return a.userAnswer === c.key})[0].value;

				return a;
			});


			node.find('.results').empty().html(mustache.render(template, {
				rate: Math.floor((answers.length - falls.length) * 100 / answers.length),
				count: falls.length,
				answers: falls }
			));
		}

		node
			.on('completed', '.questions', show)
			.on('click', '.repeat', function() { node.find('.results').empty()});

	};

});