var express = require('express');

var app = express();

var lz = require('./back/app.js');

lz.createTmp(app);
lz.uploadImg(app);
app.use(express.static('./'));

app.listen(10086);