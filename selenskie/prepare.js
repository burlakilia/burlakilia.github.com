var houses = require('./public/data/houses'),
	fs = require('fs');


houses.places = houses.places.map(function (data) {
	data.id = data.data.number;
	return data;
});

houses.places.map(function (data) {

	if (data.id <= 36) {
		data.data.type = 5;
	} else if (data.id <= 51) {
		data.data.type = 1;
	} else if (data.id <= 62) {
		data.data.type = 2;
	} else if (data.id <= 194) {
		data.data.type = 3;
	} else if (data.id <= 270) {
		data.data.type = 4;
	} else if (data.id <= 307) {
		data.data.type = 3;
	} else if (data.id <= 314) {
		data.data.type = 2;
	} else if (data.id <= 336) {
		data.data.type = 1;
	} else if (data.id <= 411) {
		data.data.type = 2;
	} else if (data.id <= 424) {
		data.data.type = 1;
	}

	return data;
});

fs.writeFileSync('./public/data/houses_new.json', JSON.stringify(houses, 1, 1));


