/*
var http=require('http');
var fs=require('fs');

http.createServer(function(req,res){
	fs.readFile('test.txt','utf8',function(err,data){
		res.writeHead(200,{'Content-Type':'text/plain'});
		if(err)
		{
			res.write('error occured');
		}
		else
		{
			res.write(data);			
		}
		res.end();
	});
	
}).listen(3000,function(){console.log(3000);})
*/

//变本
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
function writeNum(res) {
	var counter = 0;
	for (var i = 0; i < 100; i++) {
		counter++;
		res.write(counter.toString() + '\n');
	}
}

http.createServer(function (req, res) {
	var query = url.parse(req.url).query;
	var filename = querystring.parse(query).file + '.txt';
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	writeNum(res);
	setTimeout(function () {
		console.log('opening '+filename);
		fs.readFile(filename, 'utf8', function (err, data) {
			if (err) {
				res.write('error occured');
			}
			else {
				res.write(data);
			}
			res.end();
		});

	}, 2000);
}).listen(3000, function () { console.log(3000); })