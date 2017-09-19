/* 
* @Author: Marte
* @Date:   2017-09-02 12:04:42
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 13:10:59
*/

define(['cookie','user','da'],function(){
    return {
        fixF:function(){
            //购物车数量初始化
            var fcn = $("#fix_car .car_num");

            // 查找是否登录
            var cc = new Cookie({name:"user"}).init();
            var u = cc.get();
            // 如果登录直接读取数据库
            if(u){
            $(".user_li .fix_hide .tips").html(u+',您好！');
            var user =  new userdas({id:u}).init();
            var local = location.href;
            if(local.indexOf("index.html")>-1)
                user.api = true;
            user.car_get(function(data){
                //没有数据
                if(data=='') fcn.html(0);
                else fcn.html(data.num);
            });
            }else{//不登录读取cookie
            //改变cookie的名字为购物车数量
            cc.name = 'cnum';
            // 查找之前的购物车cookie
            var num_origin = cc.get();
            if(num_origin)  fcn.html(num_origin);
            else fcn.html(0);  
            }



            $(".fix").on("mouseenter",".icof",function(){
            $(this).addClass('on').next().show();
            // 返回顶部
            if($(this).attr("id")=='fix_toTop'){             
                $(this).next().on("click",'span',function(){
                    $("body,html").scrollTop(0);
                });
            }
            else if($(this).attr("id")=='fix_user'){
                $(this).parent().find(".close").on("click",function(){
                    $(this).parent().hide();
                })
            }
            else if($(this).parent().hasClass('carrr')){
                $(this).parent().find(".car_num").css({
                    background:"#fff",color:"#f70800"
                });
            }
            }).on("mouseleave","li",function(){
            $(this).find(".fix_hide").hide();
            $(this).find(".icof").removeClass('on');

            if($(this).hasClass('carrr')){
                    $(this).find(".car_num").css({
                        color:"#fff",background:"#f70800"
                    });
                }
            })

            $(".fix").on("click","#fix_toTop",function(){
            // 返回顶部
            $("body,html").scrollTop(0);
            });
            
        }//fixF
    }//return
});//defined