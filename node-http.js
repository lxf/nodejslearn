var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('hello nodejs');
}).listen(2000);
