var http = require("http"),
	url = require("url"),
	qs = require('querystring'),
	path = require("path"),
	fs = require("fs"),
	port = 8080;

var map = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.jpg':'image/jpeg'
};

http.createServer(function(request, response) {

	var uri = url.parse(request.url).pathname
		, filename = path.join(process.cwd(), 'public', uri);

	if (request.method == 'POST') {
		var body = '';
		request.on('data', function (data) {
			body += data;

			// Too much POST data, kill the connection!
			if (body.length > 1e6)
				request.connection.destroy();
		});
		request.on('end', function () {
			require('./routes/features')(qs.parse(body));
			response.end();
		});
	}
	fs.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) filename += '/index.html';

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}

			response.writeHead(200, {"Content-Type": map[path.extname(filename)]});
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(parseInt(port, 10));