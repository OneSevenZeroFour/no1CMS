/**
 * 图片上传
 * 模块式开发
 * 严格判断了是否为图片类型才能上传
 * 上传成功后 删除了formData对象的值，否则不刷新页面，导致把上次的文件又上传了
 * jQuery事件带来的 异常提交（会出现迷之循环），使用原生js 事件 ，问题解决
 * by:lfp
 * time:2017年9月21日11:23:43
 */

define(function(){
    return {
        upF:function(){
            console.log('run upF');
                 
              var CookieMethd = {
                    //设置cookie
                    set:function(name,val,expires,path,domian){
                      var cookieStr = name + '='+val;
                      //是否设置了有效期参数
                      if(expires){
                        cookieStr +=';expires='+expires.toUTCString();
                      }
                      //是否设置了路径参数
                      if(path){
                        cookieStr +=';path='+path;
                      }
                      //是否设置了域名参数
                      if(domian){
                        cookieStr +=';domian='+domian;
                      } 
                      //写入cookie
                      document.cookie = cookieStr;  
                    },
                    //获取cookie
                    get:function(name){
                      //获取全部cookie
                      var cookies = document.cookie;
                      if(cookies.length === 0){
                        return "";
                      }
                      //如果cookie没有数据 就返回空字符串
                      //如果有 则拆分
                      cookies = cookies.split('; ');
                      //用于接收cookie字符串 并被返回
                      var res = '';
                      cookies.forEach(function(item){
                        var arr = item.split("=");
                        if(arr[0] === name){
                          res = arr[1];
                        }
                      })
                      return res;
                    },
                    //删除cookie
                    remove:function(name){
                      var nowTime = new Date();
                        nowTime.setDate(nowTime.getDate()-99);
                        // console.log(nowTime.toUTCString());
                      // document.cookie = name+'=null;expires='+nowTime.toUTCString()+';path=/';
                      // path 路径问题导致无法删除cookie
                      console.log('测试：'+document.cookie)
                      CookieMethd.set(name,null,nowTime);
                    }
              }  

              var ckUserName = CookieMethd.get("username");

              //判断文件类型是否为图片  input file 标签 accept="image/*"/ 支持全图片
              var imgType = ["jpg","jpeg","gif","png"],
                  newDataFace = new FormData(),
                  newDataGz = new FormData(),
                  surface = $("#surface"),//封面图片
                  btnSurface = $("#btn-surface"),//封面图片按钮
                  goodsImg = $("#goodsImg"),//商品图
                  btnGoods = $("#btn-goods"),//商品图
                  typeFlag = false;


              var xhr = new XMLHttpRequest();
              // surface.on("change",function(){
              //       // 遍历判断格式
              //       var files = this.files;
              //       var selfer = this;
              //       judgeType(files);
              //       //图片预览
              //       // console.log(window.URL.createObjectURL(files[0]))

              //       var imgStr = "";
              //       //将正确格式写入 FormData 对象
              //       for(var i=0;i<files.length;i++){
              //           imgStr += `<img src="${window.URL.createObjectURL(files[i])}" alt="图片预览"/>`;
              //           newDataFace.append(ckUserName,files[i]);
              //       }
              //       $(".showImgtp").html(imgStr);

              //       // btnSurface.attr("disabled",false);
              //       // btnSurface[0].onclick = function(){
              //       //     if(typeFlag){
              //       //         // if(confirm("确认提交")){
              //       //             var btn = this;
              //       //             var formData = newDataFace;
              //       //             xhrRequest(selfer,btn,formData);
              //       //             xhr.open("post","http://localhost:10086/pushImgs",true);
              //       //             xhr.send(newDataFace);
              //       //             // newDataFace.delete(ckUserName);
              //       //             // //清空加载的文件 这里清空会出现 图片不能正常上传成功
              //       //         // }
              //       //     }
              //       // }
              // });
              /*----------------------------------------*/
              goodsImg.on("change",function(){
                    // 遍历判断格式
                    var files = this.files;
                    var selfer = this;
                    judgeType(files);
                    console.log(typeFlag)

                    var imgStr = "";
                    //将正确格式写入 FormData 对象
                    for(var i=0;i<files.length;i++){
                    imgStr += `<img src="${window.URL.createObjectURL(files[i])}" alt="图片预览"/>`;
                    newDataGz.append(ckUserName,files[i]);
                    }
                    $(".showImgbt").html(imgStr);
                    console.log(8888)

                    btnGoods.attr("disabled",false);
                    btnGoods[0].onclick = function(){
                        console.log(999)
                        if(typeFlag){
                            // if(confirm("确认提交")){
                                var btn = this;
                                var formData = newDataGz;
                                xhrRequest(selfer,btn,formData);
                                xhr.open("post","http://localhost:10086/pushgzImg",true);
                                xhr.send(newDataGz);
                            // }else{
                            //     return false;
                            // } 
                        } 
                    }
              });

                function xhrRequest(selfer,btn,formData){
                  var imgPathFace = [],imgPathGoods = [];
                  var pro = new Promise(function(resolve,reject){
                      xhr.onreadystatechange = function(){
                            if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)){
                              var datas = xhr.responseText;
                              try{
                                    datas = JSON.parse(xhr.responseText);
                                    console.log(datas)
                                    if(datas.success == "over"){
                                        selfer.value = "";
                                        $(btn).attr("disabled","disabled");
                                        formData.delete(ckUserName);//清空加载的文件
                                        // alert("图片上传成功！");

                                    }
                                    if(datas.faceimg){
                                        datas.faceimg.forEach(function(item){
                                            console.log(item);
                                            imgPathFace.push(item)
                                        })
                                        resolve(imgPathFace)
                                    }
                                    if(datas.goodsimg){
                                        datas.goodsimg.forEach(function(item){
                                            console.log(item);
                                            imgPathGoods.push(item)
                                        })
                                        resolve(imgPathGoods)
                                    }     

                                    $(".edit_imgs").append(imgPathGoods.map(function(item){
                                        var im = 'img/'+item.slice(1);
                                        return `<div>
                                        <img src='../${im}' />
                                        <a href='javascript:;'>&times;</a>
                                        </div>`;
                                    }).join(""));                  

                              }catch(err){
                                console.log(err)
                              }
                            }
                        }       
                  })
                  pro.then(function(img1,img2){
                    console.log(img1,img2)
                    
                  },function(){console.log("err")})
                }  

                function judgeType(files){
                  for(var fs of files){
                    var suffix = fs.name.split(".");
                    //获取后缀
                    suffix = suffix[suffix.length - 1];
                    for(var i=0;i<imgType.length;i++){
                      if(suffix == imgType[i]){
                        // console.log("格式正确");
                        typeFlag = true;
                      }
                      if( typeFlag == false){
                        alert("请上传图片");
                        typeFlag = false;
                        return false;
                      }
                    }
                  }
                    // console.log("格式正确才打印");
                } 
        }
    }

});
