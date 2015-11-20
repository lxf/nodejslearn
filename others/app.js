var http = require('http');        

//返回的是html
var onRequest = function (req, res) {
	// console.log(req.headers);//内容太多了，先只打印header信息，看是不是打印2次
	console.log(req.url);//内容太多了，先只打印header信息，看是不是打印2次
	res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
	res.write('<html><body>');
	res.write('<h2>Hello World!</h2>');
	res.end('</body></html>');
};

var app = http.createServer(onRequest);

app.listen(8000);