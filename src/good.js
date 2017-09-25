/* 
* @Author: Marte
* @Date:   2017-09-13 16:11:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-25 13:04:54
*/

var express = require('express');
var mysql = require('mysql');     

var editor = require('./back/editor.js');
var _editor = require('./js/kefu.js');

// 连接数据库
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'f_ugo'
});
connection.connect();
// 初始化express应用程序
var exp = new express();
exp.use(express.static('./'));
exp.use(express.static("./img"));
var sqlF = require('./back/js/good_sql.js');
var file = require('./back/js/searchVIP.js');

file.fileF(exp,connection);
sqlF.mysqlFun(exp,connection);
editor.init(exp);



/*editor.init方法第二个参数改为用户id<String>*/

var multer = require('multer');
var _name = [];
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'html/imgs');
    },
    filename:function(req,file,cb){
        var name = file.originalname.split('.');
        var a = file.fieldname+'-'+Date.now()+Math.random()+'.'+name[name.length-1];
        _name.push(a);
        cb(null,a);
    }
});
var upload = multer({
    storage:storage
});
exp.post('/file',upload.any(),function(req,res,next){
    res.append('Access-Control-Allow-Origin','*');
    res.send(_name);
    _name = [];
});

exp.listen(10086);