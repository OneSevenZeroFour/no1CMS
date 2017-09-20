var http = require('http');
var ioFunc = require('socket.io');
var server = http.createServer();
var io = ioFunc(server);
io.on('connection',function(socket){
    socket.on('sendMsg',function(data){
        console.log(data);
    });
});
server.listen(8888);