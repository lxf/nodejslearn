var lineReader = require('line-reader');
var mongoose = require('mongoose'),
    path = require('path'),
    Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/card');  // 连接数据库，记得要启动mongodb数据库哦

var CostSchema = new Schema({
    CostDate: Date,
    CostRemark: String,
    CostNum: Number
});

// 建立文章model
// var Post = mongoose.model('Post', PostSchema);
var Cost = db.model('Cost', CostSchema);

lineReader.eachLine('data.txt', function (line, last) {
    line=line.substring(0,line.length-1);
    var dt = line.split(",")[1];
    var remark = line.split(",")[3];
    var costnum = line.split(",")[5].trim();
    var cost = new Cost();
    console.log(parseInt(costnum));
    cost.CostDate = dt;
    cost.CostRemark = remark;
    cost.CostNum = costnum;

    cost.save(function (err, docs) {
        console.log('done');
    });
});