/* 
* @Author: Marte
* @Date:   2017-09-13 16:11:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 09:15:39
*/

var express = require('express');
// 初始化express应用程序
var exp = new express();
exp.use(express.static('./'));
var sqlF = require('./back/js/good_sql.js');

sqlF.mysqlFun(exp);

exp.listen(10086);