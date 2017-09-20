/*
mysql 增删查改
 */
//内置模块
const http = require("http");
const url_md = require("url");
const queryStr = require("querystring");
//第三方模块
var mysql = require("mysql");
//连接数据库
var connection = mysql.createConnection({
	host:"localhost",
	user:"ping",
	password:"123123",
	database:"pingdb"
});
//执行连接
connection.connect(); //node表

var select = require("./select.js");
var insert = require("./insert.js");
var deletes = require("./deletes.js");
var edit = require("./edit.js");
var updates = require("./update.js");

//request 请求头 response 响应头
//Request URL:http://localhost:10088/select
//Request Method:GET
http.createServer((req,res)=>{
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.writeHead(200, {'Content-Type': 'text/html'});

	//获取URL信息 请求信息
	var requestData = "";
	// console.log(url_md.parse(req.url)) //url中的路径名
	var requestType = url_md.parse(req.url).pathname.slice(1);
	// console.log(requestType)
	

	//请求头数据 读取到数据的事件 post请求 有用
	req.on("data",chunk=>{
		requestData+=chunk;//拼接数据 字符串
	})

	//请求头结束 end是把数据读完后产生的事件。
	req.on("end",function(){
		//把一个 URL 查询字符串 str 解析成一个键值对的集合
		// console.log(requestData)
		var requestRes = queryStr.parse(requestData);
		console.log(requestRes)
		if(requestType == "select"){
			//模块化
			
			select(connection,res);
		}else if(requestType == "insert"){
			
			insert(connection,requestRes,res);
		}else if(requestType == "delete"){
			
			deletes(connection,requestRes,res);
		}else if(requestType == "edit"){
			
			edit(connection,requestRes,res);
		}else if(requestType == "update"){
			
			updates(connection,requestRes,res);
		}

	})
	
}).listen(10088);



















