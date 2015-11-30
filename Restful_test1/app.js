var express = require('express');
var app = express();
var fs = require('fs');

//添加的新用户数据
var user = {
	"user4": {
		"name": "mohit",
		"password": "password4",
		"profession": "teacher",
		"id": 4
	}
}

/*
req.query
： 处理 get 请求

req.params
： 处理 /:xxx 形式的 get 请求

req.body
： 处理 post 请求

req.param()
： 可以处理 get 和 post 请求，但查找优先级由高到低为req.params→req.body→req.query

对于http://localhost:3000/test?id=110&password=120
req.query.id为110

*/
app.get('/', function (req, res) {
	res.end('welcome');
});

//通配符，匹配/test/之后的任意URL
app.get('/test/*', function (req, res, next) {
    // res.send(req.originalUrl);//req.originalUrl获取当前URL,当要用next的时候当然要注释掉这句结束响应的代码
	req.temp = "我是上一个路由传来的数据";
	next();//转移给下一个路由
	/*
	next（）一般用来编写中间件
	中间件一般不直接对客户端进行响应，而是对请求进行一些预处理，再传递下去；
	中间件一般会在路由处理之前执行；
	*/
});

//访问http://localhost:8000/test/next
app.get('/test/next', function (req, res) {
    res.send("content: " + req.temp);
})


app.get('/listallusers', function (req, res) {
	fs.readFile('user.json', 'utf8', function (err, data) {
		res.end(data);
	});
});

app.get('/addUser', function (req, res) {
	// 读取已存在的数据
	fs.readFile("user.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		data["user4"] = user["user4"];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});

app.get('/deleteUser', function (req, res) {
	fs.readFile("user.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		delete data["user" + 2];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});

app.get('/:id', function (req, res) {
	// 首先我们读取已存在的用户
	fs.readFile("user.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var user = data["user" + req.params.id];
		if (user == undefined) {
			res.end("未找到该用户");
		}
		console.log(user);
		res.end(JSON.stringify(user));
	});
});

//另一种方式，学下路由

// 建立 Router
var router = express.Router();
//写一个每次请求路由都处理的逻辑
router.use(function(req,res,next){
	console.log(new Date());
	next();	
});

router.get('/hello', function (req, res) {
	res.send('这是新的router!');
});

//http://localhost:8000/router/hello/snail
router.get('/hello/:name',function(req,res){
	res.send('hello '+req.params.name+'!');	
});

// 另一个路由
router.get('/about', function (req, res) {
	res.send('关于页面!');
});

app.use('/router',router);

var server = app.listen(8000, function () {
	console.log('当前文件的所在目录:' + __dirname);
	var host = server.address().address;
	var port = server.address().port;
	console.log("访问地址为 http://%s:%s", host, port)
});