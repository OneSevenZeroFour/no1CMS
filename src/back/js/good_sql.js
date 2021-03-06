/* 
* @Author: Marte
* @Date:   2017-09-22 09:44:46
* @Last Modified by:   Marte
<<<<<<< HEAD
* @Last Modified time: 2017-09-25 12:10:04
*/

function mysqlFun(exp,connection){
    
    // 用于处理 JSON, Raw, Text 和 URL 编码的数据
    var body_parser = require('body-parser');
    var querystring = require('querystring');

    exp.use(body_parser.json());
    exp.use(body_parser.urlencoded({
        extended:true
    }));
    // post/get/all 第一个参数是路由（完全匹配）
    // post获取参数 req.body  get获取参数 req.query
    exp.post('/select',function(req,res){
    // exp.get('/select',function(req,res){
        res.append("Access-Control-Allow-Origin", "*");
        // var obj = req.query;
        var obj = req.body;
        var start = (obj.page-1)*obj.num;
        var str = `select * from goodbase order by time desc limit ${start},${obj.num}`;
        var str1 = 'select * from goodbase';
        if(obj.tag) {
            str = `select * from goodbase where tag like "%${obj.tag}%" order by time desc limit ${start},${obj.num}`;
            str1 += ' where tag like "%'+obj.tag+'%"';
        }
          
        connection.query(str,function(err,ress,field){
            if(err) throw err;
            var obj = {data:JSON.stringify(ress)};
            connection.query(str1,function(err,ress,field){
                if(err) throw err;
                obj.sum = ress.length;
                res.send(JSON.stringify(obj)); 
            });      
        });      
    }).post('/insert',function(req,res){
        res.append("Access-Control-Allow-Origin", "*");
        var obj = req.body.obj;
           
        connection.query(`insert into goodbase (name,img,price,sale,tag,stock,det,seller,you,time) values ("${obj.name}","${obj.img}","${obj.price}","${obj.sale}","${obj.tag}","${obj.stock}","${obj.det}","${obj.seller}","${obj.you}","${obj.time}")`,function(err,ress,field){
                if(err) throw err;
                console.log('goodbase insert success');
                connection.query(`insert into gooddetails (id,imgs,seller,brand,href,time,param,list,de_imgs,free,sub,deli) values (${ress.insertId},"${obj.imgs}","${obj.seller}","${obj.brand}","${obj.href}","${obj.time}","${obj.param}","${obj.list}",'${obj.de_imgs}',"${obj.free}","${obj.sub}","${obj.deli}")`,function(err,ress,field){
                    if(err) throw err;
                    console.log('gooddetails insert success');                     
                    res.send(JSON.stringify(ress));
                });
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
        // var de = querystring.stringify(obj.de_imgs);
        connection.query(`update goodbase set name="${obj.name}",img="${obj.img}",price="${obj.price}",sale="${obj.sale}",tag="${obj.tag}",stock="${obj.stock}",det="${obj.det}",seller="${obj.seller}",you="${obj.you}" where id=${obj.id}`,function(err,ress,field){
            if(err) throw err;  
            console.log('update goodbase success');
            connection.query(`update gooddetails set imgs="${obj.imgs}",seller="${obj.seller}",brand="${obj.brand}",href="${obj.href}",param="${obj.param}",list="${obj.list}",de_imgs='${obj.de_imgs}',free="${obj.free}",sub="${obj.sub}",deli="${obj.deli}" where id=${obj.id}`,function(err,ress,field){
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
    });
}

exports.mysqlFun = mysqlFun; 