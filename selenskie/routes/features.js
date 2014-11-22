var fs = require('fs'),
	path = require('path'),
	tpl = fs.readFileSync(path.resolve(__dirname, './houses.tpl.json')).toString(),
	houses = JSON.parse(fs.readFileSync(path.resolve(__dirname, './../public/data/houses.json')).toString());

module.exports = function (params) {
	var polygon;

	polygon = tpl
		.replace('{{id}}', params.id)
		.replace('{{polygon}}', params.polygon.replace(/"/ig, ''))
		.replace('{{number}}', params.number)
		.replace('{{status}}', params.status)
		.replace('{{type}}', params.type)
		.replace('{{sq}}', params.sq);

	houses.places.push(JSON.parse(polygon));
	fs.writeFileSync(path.resolve(__dirname, './../public/data/houses.json'), JSON.stringify(houses, 1, 2));
};