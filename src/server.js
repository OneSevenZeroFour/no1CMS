var express = require('express');

var app = express();

var editor = require('./back/editor.js');

/*editor.createTmp(app);
editor.uploadImg(app);
editor.saveDetailImgs(app);
editor.deleteTmpImgs(app);*/

editor.init(app);

app.use(express.static('./'));

app.listen(10086);