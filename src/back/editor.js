var fs = require('fs');

var multer = require('multer');

var storage;
var upload;


/*创建商家文件夹用于存放图片*/
function createTmp(app){
    app.get('/enterAddGood',function(req,res){
        res.set('Access-Control-Allow-Origin','*');
        var fls;
        var tmpUrl = './back/tmp/';
        var srcUrl = './back/resource/';
        var userid = req.query.id;
        // userid = Cookie.get(req.header.cookie,'user');
        // var userid = '1113';
        var wrong = 0;
        /*查看商品的图片缓存区是否存在*/
        fs.access(tmpUrl+'shop' + userid,function(err){
            if (err) {
                /*若不存在则创建一个商家id命名的文件夹*/
                fs.mkdir(tmpUrl+'shop' + userid ,0777,function(error){
                  if (error) {console.log('创建失败')}
                    wrong = 1;
                });
                fs.mkdir(srcUrl+'shop' + userid ,0777,function(error){
                  if (error) {console.log('创建失败')}
                    wrong = 1;
                })
            }
            if (wrong === 0) {
                res.send('success');        
            }else{
                res.send('fail');
            }

        })           
    });
}
/*保存临时图片至资源库*/
function saveDetailImgs(app){
    app.get('/didSaveImgs',function(req,res){
        res.set('Access-Control-Allow-Origin','*')
        var fileUrl = 'back/tmp/';
        var newUrl = 'back/resource/';
        var userid = req.query.id;
             
        // var userid = Cookie.get(req.header.cookie,'user');
        // var userid = '1113';
        fs.readdir(fileUrl+'shop' + userid,function(err,files){
            if (err) {
                console.log(err);
                res.send(JSON.stringify({'status':'fail'}));
                return false;
            }
            var errArr = [];
            files.forEach(function(item){
                fs.rename(fileUrl+'shop'+userid+'/'+item,newUrl+'shop'+userid+'/'+item,function(err){
                    if (err) {
                        console.log(err)
                        errArr.push(err);
                    }
                });
            })
            if (errArr.length > 0) {
                res.send(JSON.stringify({'status':'fail'}));
            }else{
                res.send(JSON.stringify({'status':'success','data':{
                    oldPath:'tmp',
                    newPath:'resource'
                }}));
            }
                 
        })
    });
}
/*删除未保存的临时图片*/
function deleteTmpImgs(app,userid){
    app.get('/didUnsaveImgs',function(req,res){
             
        // res.set('Access-Control-Allow-Origin','*');
        var fileUrl = './back/tmp/';
        // var userid = Cookie.get(req.header.cookie,'user');
        // var userid = '1113';
        fs.readdir(fileUrl + 'shop' + userid,function(err,files){
            if (err) {
                console.log(err);
                res.send(JSON.stringify({'status':'fail'}));
                return false;
            }   
            var errArr = [];
            files.forEach(function(item){    
                fs.unlink(fileUrl + 'shop' + userid+ "/" + item ,function(err){
                    if (err) {
                        console.log(err);
                        errArr.push(err);
                    }
                });
            });
            if (errArr.length>0) {
                res.send(JSON.stringify({'status':'fail'}));
                return false;
            }else{
                res.send(JSON.stringify({'status':'success'}));
            }

        })
    })
}

function uploadImg(app,userid){
    app.post('/uploadToTmp',upload.any(),function(req,res){
        res.set('Access-Control-Allow-Origin','*');
        var arr  = [];
        for(var i = 0 ;i < req.files.length ; i++){
            arr.push(req.files[i]);
        }
             
        res.send(JSON.stringify({
            status:'success',
            data:arr
        }));
    })    
}

function initAddGood(app,userid){
    //处理formData
    storage = multer.diskStorage({
        destination: function(req, file, cb){
            // var userid = Cookie.get(req.header.cookie,'user');
            // var userid = '1113';
            cb(null,"./back/tmp/shop"+userid);   
        },
        filename: function(req, file, cb){
            var fileFormat = file.originalname.split('.');
            // var userid = Cookie.get(req.header.cookie,'user');
            // var userid = '1113';
            cb(null,file.fieldname + '-shop' + userid + '-' + Date.now() + '.' + fileFormat[fileFormat.length-1]);
        }
    })

    upload = multer({
        storage: storage
    })
    createTmp(app,userid);
    uploadImg(app,userid);
    saveDetailImgs(app,userid);
    deleteTmpImgs(app,userid);
}
function init(app){
    var userid = 1113;
    //处理formData
    storage = multer.diskStorage({
        destination: function(req, file, cb){
            // var userid = Cookie.get(req.header.cookie,'user');
            // var userid = '1113';
            cb(null,"./back/tmp/shop"+userid);   
        },
        filename: function(req, file, cb){
            var fileFormat = file.originalname.split('.');
            // var userid = Cookie.get(req.header.cookie,'user');
            // var userid = '1113';
            cb(null,file.fieldname + '-shop' + userid + '-' + Date.now() + '.' + fileFormat[fileFormat.length-1]);
        }
    })

    upload = multer({
        storage: storage
    })
    createTmp(app,userid);
    uploadImg(app,userid);
    saveDetailImgs(app,userid);
    deleteTmpImgs(app,userid);
}

/*暴露模块方法*/
/*引用后逐一调用*/
var obj = {
    /*外部代用init方法初始化*/
    init:init
/*    createTmp: createTmp,
    uploadImg: uploadImg,
    saveDetailImgs: saveDetailImgs,
    deleteTmpImgs: deleteTmpImgs*/
}

module.exports = obj;