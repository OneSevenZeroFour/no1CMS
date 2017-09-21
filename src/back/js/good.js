/* 
* @Author: Marte
* @Date:   2017-09-13 16:11:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-21 19:21:01
*/

var mysql = require('mysql');
var express = require('express');
// 用于处理 JSON, Raw, Text 和 URL 编码的数据
var body_parser = require('body-parser');
var querystring = require('querystring');
// 初始化express应用程序
var exp = new express();

exp.use(express.static('goods'));
// 连接数据库
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'f_ugo'
});
connection.connect();

// 返回一个用来解析json格式的中间件
// 这个中间件能接受任何body中任何Unicode编码的字符。支持自动的解析gzip和 zlib。
exp.use(body_parser.json());
// 返回一个中间件用来解析body中的urlencoded字符， 只支持utf-8的编码的字符。
// 同样也支持自动的解析gzip和 zlib。
exp.use(body_parser.urlencoded({
    extended:true
    //false时，键值对中的值为String/Array形式
    //为true的时候，可为任何数据类型
}));

// post/get/all 第一个参数是路由（完全匹配）
// post获取参数 req.body  get获取参数 req.query
exp.post('/select',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var obj = req.body;
    var start = (obj.page-1)*obj.num;
    connection.query(`select * from goodbase limit ${start},${obj.num}`,function(err,ress,field){
        if(err) throw err;
        var obj = {data:JSON.stringify(ress)};
        connection.query('select * from goodbase',function(err,ress,field){
            if(err) throw err;
            obj.sum = ress.length;
            res.send(JSON.stringify(obj)); 
        });      
    });      
}).post('/insert',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var obj = req.body.obj;
       
    connection.query(`insert into goodbase (name,price,sale,tag,stock,det,seller,you,time) values ("${obj.name}","${obj.price}","${obj.sale}","${obj.tag}","${obj.stock}","${obj.det}","${obj.seller}","${obj.you}","${obj.time}")`,function(err,ress,field){
            if(err) throw err;
            console.log('goodbase insert success');
            connection.query(`insert into gooddetails (id,seller,brand,href,time,param,list,free,sub,deli) values (${ress.insertId},"${obj.seller}","${obj.brand}","${obj.href}","${obj.time}","${obj.param}","${obj.list}","${obj.free}","${obj.sub}","${obj.deli}")`,function(err,ress,field){
                if(err) throw err;
                console.log('gooddetails insert success');                     
            });
            res.send(JSON.stringify(ress));
    });
}).post('/select_one',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var args = req.body;
    connection.query(`select * from goodbase left outer join gooddetails on goodbase.id=gooddetails.id where goodbase.id=${args.id} `,function(err,ress,field){
        if(err) throw err;          
        res.send(JSON.stringify(ress)); 
    });
}).post('/update',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var obj = req.body.obj;
    connection.query(`update goodbase set name="${obj.name}",price="${obj.price}",sale="${obj.sale}",tag="${obj.tag}",stock="${obj.stock}",det="${obj.det}",seller="${obj.seller}",you="${obj.you}" where id=${obj.id}`,function(err,ress,field){
        if(err) throw err;  
        console.log('update goodbase success');
        connection.query(`update gooddetails set seller="${obj.seller}",brand="${obj.brand}",href="${obj.href}",param="${obj.param}",list="${obj.list}",free="${obj.free}",sub="${obj.sub}",deli="${obj.deli}" where id=${obj.id}`,function(err,ress,field){
            if(err) throw err;  
            console.log('update gooddetails success');
            //完成ajax请求
            res.end('ok');
        });
    });
}).post('/delete',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var args = req.body;
    connection.query(`delete from goodbase where id=${args.idx}`,function(err,ress,field){
        if(err) throw err;     
        console.log('delete success from goodbase');
        connection.query(`delete from gooddetails where id=${args.idx}`,function(err,ress,field){
            if(err) throw err;     
            console.log('delete success from gooddetails');
        });                                             
        res.send(JSON.stringify(ress));
    });
}).listen(3000);