var fs = require('fs');
var http = require('http');
var ioFunc = require('socket.io');
var server = http.createServer();
var io = ioFunc(server);
var cus = [];
io.on('connection',function(socket){
    //用户发给客服
    socket.on('userSend',function(data){
        var res = {
            msg:data.msg,
            id:socket.id
        }
        //没有客服在线
        if(cus.length==0){
            io.sockets.sockets[socket.id].emit('no','fail');
            return;
        }
        //第一次发信息时绑定客服，之后一直同一个客服通信
        if(data.id){
            //已有客服
            var flag = false;
            cus.forEach(function(item){
                if(item[0]==data.id){
                    flag = true;
                }
            });
            if(flag){
                io.sockets.sockets[data.id].emit('toCus',res);
            }else{
                //客服下线了，重新分配并返回换客服的信息
                io.sockets.sockets[socket.id].emit('return','ok');
                toCus();
            }
        }else{
            //没有客服
            toCus();
        }
        //按顺序把用户平均分给客服
        function toCus(){
            var a = cus[0][0];
            var b = cus[0][1];
            var c = 0;
            for(var i=0;i<cus.length;i++){
                if(cus[i][1]<b){
                    b = cus[i][1];
                    a = cus[i][0];
                    c = i;
                }
            }
            cus[c][1]++;
            io.sockets.sockets[a].emit('toCus',res);
            io.sockets.sockets[socket.id].emit('setCus',a);
        }
    });
    //客服发给用户
    socket.on('cusSend',function(data){
        if(data.id){
            io.sockets.sockets[data.id].emit('toUser',data);
        }else{
            var str = '你竟然这么无聊给NPC发信息，好吧，那我就勉为其难帮你跟个机器人通讯一下#4';
            io.sockets.sockets[socket.id].emit('robot',{
                text:str,
                der:true
            });
            http.get('http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info='+data.msg,function(res){
                var a = '';
                res.on('data',function(chunk){
                    a += chunk;
                });
                res.on('end',function(){
                    a = JSON.parse(a);
                    a.der = false;
                    io.sockets.sockets[socket.id].emit('robot',a);
                });
            });
        }
    });
    //添加客服
    socket.on('addCus',function(data){
        var a = [];
        a.push(socket.id);
        a.push(0);
        cus.push(a);
    });
    //客服下线，删除客服与其上传的图片
    socket.on('overCus',function(data){
        console.log(data,data.length)
        if(data.length!=0){
            data.forEach(function(item){
                fs.unlink(item,function(err){
                    if(err){
                        return console.log(err);
                    }
                });
            });
        }
        cus.forEach(function(item,i){
            if(item[0]==socket.id){
                cus.splice(i,1);
            }
        });
    });
    //用户下线，返回信息修改客服页面,并删除其上传过的图片
    socket.on('overUser',function(data){
        if(data.pic.length!=0){
            data.pic.forEach(function(item){
                fs.unlink(item,function(err){
                    if(err){
                        return console.log(err);
                    }
                });
            });
        }
        cus.forEach(function(item){
            if(item[0]==data.id){
                item[1]--;
                io.sockets.sockets[data.id].emit('delUser',socket.id);
            }
        });
    });
});
server.listen(8888);


var express = require('express');
var multer = require('multer');
var _name = [];
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../html/imgs');
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
var app = express();
app.post('/file',upload.any(),function(req,res,next){
    res.append('Access-Control-Allow-Origin','*');
    res.send(_name);
    _name = [];
});
app.listen(1337);

console.log('go')