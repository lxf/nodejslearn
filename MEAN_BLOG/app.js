var express = require('express'),
	bodyParser = require('body-parser'),
	routes = require('./routes/route');
var app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));
app.use(express.static(__dirname + '/app'));

routes(app);

// 启动服务
app.listen(3000);