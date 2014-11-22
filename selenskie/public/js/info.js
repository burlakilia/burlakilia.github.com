/**
 * Функция загрузки изображения, для выбранного учатска с заданным номером
 * @param id - идетификатор участка
 * @param num - порядковый номер фотографии (1-4)
 * @param holder - куда добавить картинку если загрузка удалась!
 */
function loadImage (id, num, holder) {
	var img = $('<img />');

	$(img).bind({
		load: function() {
			$(holder).append(img);
			console.log("image exists");
		},
		error: function() {
			console.log("image not exists");
		}
	});

	$(img).attr('src',imagePath + '/'+ id + '-' + num + '.jpg');
}


function hide() {
	if (!formSelect) {
		$("#info").css("display", "none");
	}
}

function show(data) {
	console.log("show", data, mouse);
	$("#info").css("display", "block");
	$("#info .id").html(data['id']);
	$("#info .number").html(data['number']);
	$("#info .price").html(data['price'] + " руб.");

	var sq = 0;

	try {
		sq = parseInt(data['sq']);
		sq /= 100;
	} catch(Error) {

	}

	$("#info .sq").html(sq + " сот.");
	switch(data["status"]) {
		case 'new': $("#info .status").html("свободно"); break;
		case 'wait': $("#info .status").html("бронь"); break;
		case 'sold': $("#info .status").html("проданно"); break;
		case 'work': $("#info .status").html("рабочая"); break;
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

	$("#info .images").html("");

	for(var i=0; i<countImages; i++) {
		loadImage(data['number'], i, $("#info .images"));
	}
}