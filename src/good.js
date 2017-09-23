/* 
* @Author: Marte
* @Date:   2017-09-13 16:11:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 15:17:18
*/

var express = require('express');
var mysql = require('mysql');     
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

exp.listen(10086);