define(function(require, exports) {

	var mustache = require('mustache'),
		template = '<h3>{{text}}</h3>{{#variants}}<label><input value="{{key}}" type="radio" name="answer"/>{{value}}</label><br/>{{/variants}}<br/><button type="submit">Ответить</button><div>Осталось: {{remind}}</div>',
		answers = [],
		data;

	exports.create = function(node) {
		var current;

		function init(res) {
			data = res;

			node
				.on('click', '.repeat', repeat)
				.on('submit', 'form', onsubmit);

			next();
		}

		function repeat(){
			answers = [];
			next();
		}

		function next() {
			var len = data.length,
				key = Math.floor(Math.random() * len);

			if (answers.length === len) {
				node.trigger('completed',  [ answers ]);
				node.find('form').empty();
				return;
			}

			while (answers.filter(function(a) { return a.id === key }).length !== 0) {
				key = Math.floor(Math.random() * len);
			}

			console.log(key);

			current = data[key];

			current.variants = current.variants.sort(function() {
				return 0.5 - Math.random();
			});

			current.remind = len - answers.length;

			node.find('form').html(mustache.render(template, current));
		}

		function onsubmit() {
			var answer = +node.find('[name="answer"]:checked').val();

			current.isCorrect = current.correct === answer;
			current.userAnswer = answer;
			answers.push(current);
			next();

			return false;
		}

		require(['data/questions'], init);
	};

})