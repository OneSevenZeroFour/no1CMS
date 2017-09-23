/* 
* @Author: Marte
* @Date:   2017-09-13 16:11:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 17:18:44
*/

var express = require('express');
var editor = require('./back/editor.js');
// 初始化express应用程序
var exp = new express();
exp.use(express.static('./'));
/*editor.init方法第二个参数改为用户id<String>*/
editor.init(exp,'1113');
var sqlF = require('./back/js/good_sql.js');

sqlF.mysqlFun(exp);

exp.listen(10086);



