/* 
* @Author: Marte
* @Date:   2017-09-13 16:11:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-22 10:19:40
*/

var express = require('express');
// 初始化express应用程序
var exp = new express();
var sqlF = require('./good_sql.js');

sqlF.mysqlFun(exp);

exp.listen(3000);