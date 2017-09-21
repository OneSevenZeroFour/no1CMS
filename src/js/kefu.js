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
            io.sockets.sockets[data.id].emit('toCus',res);
        }else{
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
        io.sockets.sockets[data.id].emit('toUser',data);
    });
    //添加客服
    socket.on('addCus',function(data){
        var a = [];
        a.push(socket.id);
        a.push(0);
        cus.push(a);
    });
});
server.listen(8888);
console.log('go')