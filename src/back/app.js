// var express = require('express');

var fs = require('fs');

var multer = require('multer');

var Cookie = require('./cookie');

// app.use(express.static('../'));


//处理formData
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        var userid = '1113';
        cb(null,"./back/tmp/shop"+userid);   
    },
    filename: function(req, file, cb){
        var fileFormat = file.originalname.split('.');
        var userid = '1113';
        cb(null,file.fieldname + '-shop' + userid + '-' + Date.now() + '.' + fileFormat[fileFormat.length-1]);
    }
})

var upload = multer({
    storage: storage
})




function uploadImg(app){
    app.post('/uploadToTmp',upload.any(),function(req,res){
        console.log(req.files);
        var arr  = [];
        for(var i = 0 ;i < req.files.length ; i++){
            arr.push(req.files[i]);
        }
        console.log(JSON.stringify(arr));
             
        res.set('Access-Control-Allow-Origin','*');
        res.send(JSON.stringify({
            status:'success',
            data:arr
        }));
    })    
}

function createTmp(app){
    /*创建一个临时文件夹用于存放临时图片*/
    app.get('/enterAddGood',function(req,res){
        var fls;
        var fileUrl = './back/tmp/';
        var userid = '1113';
        /*查看商家的图片缓存区是否存在*/
        fs.access(fileUrl+'shop' + userid,function(err){
            if (err) {
                fs.mkdir(fileUrl+'shop' + userid ,0777,function(error){
                  if (error) {console.log('创建失败')}
                })
            }

        })            
        /*catch(e){
            console.log(e)
              fs.mkdir(fileUrl+'shop' + userid ,0777,function(err){
                // if (error) {console.log('创建失败')}
            })
        }*/
        res.append('Access-Control-Allow-Origin','*');
        res.send('success');
    });
}


var obj = {
    createTmp: createTmp,
    uploadImg: uploadImg
}

module.exports = obj;