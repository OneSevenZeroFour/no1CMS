/* 
* @Author: Marte
* @Date:   2017-09-01 10:28:46
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 13:04:58
*/

define(['cookie'],function(){

    return {
        hea:function(){
            var lef = $(".header .left");
            var ul = lef.find('ul');
            var sj = $(".header .right>li").last();
            var ma = sj.find(".e_code");

            ul.css("width",190);   
                           
            // 公告数据
            var arr = ['优品惠（优购物）5周年庆，盛大聚“惠”','【注意】自主语音订购说明','【公告】防诈骗提醒','【紧急通知】关于短信发送异常的公告'];

            for(var i=0;i<arr.length;i++){
                ul.append($(`<li>${arr[i]}</li>`));
            }
                 
            // 已登录
            var u = new Cookie({name:"user"}).init();
            var user = u.get();
            var reg_a = $("#reg_a"),log_a = $("#log_a");  
            var my_li = $("#my_list"),my_ca = $("#my_care");

            if(user){
                reg_a.html("欢迎您，"+user).attr("href","user.html").closest('li').addClass('noborder');
                if(location.href.indexOf("index.html")>-1) reg_a.attr("href",'html/user.html');
                log_a.html("退出").attr("href","javascript:;");
                my_ca.remove();
                var li  = $("<li id='mine'><a href='user.html'>我的账户</a></li>");
                my_li.before(li);

                log_a.on("click",function(){
                    u.del();
                    reg_a.html("注册").attr("href","register.html").closest('li').removeClass('noborder');
                    // window.location.href = '../index.html';
                    log_a.html("登录").attr("href","login.html");
                    $("#mine").remove();
                    var li  = $('<li id="my_care"><a href="">我的关注</a></li>');
                    my_li.after(li);
                });
            }

            var timer;
            anim();

            sj.on("mouseenter",function(){
                $(this).find("a").css("color","#f70800");
                ma.show();
            }).on("mouseleave",function(){
                setTimeout(function(){
                    sj.find("a").css("color","#666");
                    ma.hide();
                },200);
            });


            ul.on("mousemove",'li',function(){
                clearInterval(timer);
            }).on('mouseleave','li',function(){
                anim();
            }); 

            function anim(){
                timer = setInterval(function(){
                ul.stop();
                ul.animate({"margin-top":-28},'slow',function(){
                    var fir = ul.children().first();
                    var clo = fir.clone(true, true);
                    fir.remove();
                    ul.css("margin-top",0).append(clo);
                });
            }, 3000);  
            }
        }
        
    }//return

});


