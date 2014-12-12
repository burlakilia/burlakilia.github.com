var prices = {
	1: 100,
	2: 85,
	3: 70,
	4: 55,
	5: 40
};

/**
 * Функция загрузки изображения, для выбранного учатска с заданным номером
 * @param id - идетификатор участка
 * @param num - порядковый номер фотографии (1-4)
 * @param holder - куда добавить картинку если загрузка удалась!
 */
function loadImage (id, num, holder) {
	var img = $('<img />');

	if (false) {
		return;
	}

	$(img).bind({
		load: function() {
			$(holder).append(img);
			console.log("image exists");
		},
		error: function() {
			console.log("image not exists");
		}
	});

	$(img).attr('src',imagePath + '/'+ id + '-' + num + '.png');
}

function hide() {
	if (!formSelect) {
		$("#info").css("display", "none");
	}
}

function show(data) {
	$("#info").css("display", "block");
	$("#info .id").html(data['id']);
	$("#info .number").html(data['number']);

	var sq = 0,
	    price = prices[data.type || 3] * 1000;

	try {
		sq = parseInt(data['sq']);
		sq /= 100;
	} catch(Error) {

	}

	price *= sq;

	$("#info .price").html(price.formatMoney(2, '.', ' ') + " руб.");
	$("#info .sq").html(sq + " сот.");
	$("#info .sq_price").html((prices[data.type || 3] * 1000).formatMoney(2, '.', ' ') + " руб.");

	switch(data["status"]) {
		case 'new': $("#info .status").html("Свободен"); break;
		case 'wait': $("#info .status").html("Забронирован"); break;
		case 'sold': $("#info .status").html("Продан"); break;
	}

	$("#info .holderText").css("display","none");
	$("#info .holderDesc").css("display","none");

	$("#info .holderNumber").css("display","block");
	$("#info .holderStatus").css("display","block");

	if(data["status"] == 'sold'  || data["status"] == 'wait') {
		$("#info .holderSq").css("display","none");
		$("#info .holderPrice").css("display","none");
	} else {
		$("#info .holderSq").css("display","block");
		$("#info .holderPrice").css("display","block");

		if (data['text']!= "") {
			$("#info .holderDesc").css("display","block");
			$("#info .holderDesc").html(data['text']);
		}
	}

	if (data["status"] == 'work') {
		$("#info .holderStatus").css("display","none");
		$("#info .holderSq").css("display","none");
		$("#info .holderDesc").css("display","none");

		$("#info .holderPrice").css("display","none");
		$("#info .holderText").css("display","block");
		$("#info .holderText").html(data['text']);
		$("#info .holderNumber").css("display","none");
	}

	$("#info")
		.toggleClass('new', data.status === 'new')
		.toggleClass('wait', data.status === 'wait')
		.toggleClass('sold', data.status === 'sold')
		.toggleClass('work', data.status === 'work');

	$("#info .images").html("");


	for(var i=0; i<countImages; i++) {
		loadImage(data['number'], i, $("#info .images"));
	}

}

Number.prototype.formatMoney = function(c, d, t){
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? "" : "");
};