/**
 * [用于登录页面 查询用户类别是否为管理商家 进入后台页面]
 * [用于后台页面 查询用户信息]
 * by：lfp
 */
function fileUp(app,connection){
	const bodyps = require("body-parser");
	const multer = require("multer");

	app.use(bodyps.json());
	app.use(bodyps.urlencoded({
		extended:true
	}));
	//用于查询 登录
	app.post("/searchVIP",function(req,res){
		res.setHeader("Access-Control-Allow-Origin","*");
		console.log(req.body);

		connection.query(`select * from userbase where id="${req.body.userID}"`,function(err,results,file){
			if(err) throw err;
			console.log(results);
			results.forEach(function(item){
				if(item.vip == 1){
					res.send("manager");
				}else if(item.vip == 0){
					res.send("guest");
				}
			})
			
		})
	});

	//查询商家信息
	//开启静态文件夹 用于 暴露 商家头像文件夹
	// app.use(express.static("img"));

	app.get("/businessmen",function(req,res){
		res.setHeader("Access-Control-Allow-Origin","*");
		console.log(req.query.userID);

		connection.query(`select * from adminInfo where phone="${req.query.userID}"`,function(err,results,file){
			if(err) throw err;
			console.log(results);
			res.send(JSON.stringify({
				results
			}));
			
		})
	});

	//配置封面图片文件上传
	var storage = multer.diskStorage({
		//存放目录
		destination:function(req,file,cb){
			cb(null,"./img/surfacePlot")
		},
		//设置文件名
		filename:function(req,file,cb){
			var format = file.originalname.split(".");
				format = format[format.length - 1]
			cb(null,file.fieldname + "-" + Date.now() + "." + format)
		}
	});
	var uploader = multer({
		storage:storage
	});

	//多文件上传
	app.post("/pushImgs",uploader.any(),function(req,res,next){
		res.setHeader("Access-Control-Allow-Origin","*");
		//得到上传的文件信息 将路径存入数据库
		var pathArr=[];
		req.files.forEach(function(item){
			// console.log(item.fieldname,item.path);
				var path = item.path.slice(3);
				path = path.replace(/\\/g,"/");
				pathArr.push(path);
				
				connection.query(`insert into uploading (phone,type,imgurl) values ("${item.fieldname}","faceimg","${path}")`,function(err,results,file){
					if(err) throw err;
					console.log(results)
				})
		});
		res.send(JSON.stringify({
			success:"over",
			faceimg:pathArr
		}));	
		next();
	})
	//配置商品图片文件上传
	var storageGs = multer.diskStorage({
		//存放目录
		destination:function(req,file,cb){
			cb(null,"./img/mangeGoods")
		},
		//设置文件名
		filename:function(req,file,cb){
			var format = file.originalname.split(".");
				format = format[format.length - 1]
			cb(null,file.fieldname + "-" + Date.now() + "." + format)
		}
	});
	var uploaderGs = multer({
		storage:storageGs
	});
	app.post("/pushgzImg",uploaderGs.any(),function(req,res,next){
		res.setHeader("Access-Control-Allow-Origin","*");
		//得到上传的文件信息 将路径存入数据库
		var pathArr=[];
		req.files.forEach(function(item){
			console.log(item.fieldname,item.path);
				path = item.path.slice(3);
				path = path.replace(/\\/g,"/");
				pathArr.push(path);

				connection.query(`insert into uploading (phone,type,imgurl) values ("${item.fieldname}","goodsimg","${path}")`,function(err,results,file){
					if(err) throw err;
					console.log(results)
				})
		});
		res.send(JSON.stringify({
			success:"over",
			goodsimg:pathArr
		}));	
		next();
	})
}

// module.exports = fileUp;
exports.fileF = fileUp;















