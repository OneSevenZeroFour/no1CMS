/* 
* @Author: Marte
* @Date:   2017-09-04 17:56:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 15:10:22
*/

require(['config'],function(){
    require(['jq','headjs','fix','user','cookie'],function(jQ,hea,fixjs){

       $("#fixx").load("fix.html",function(){
          fixjs.fixF();
       });
       $("#header").load("header.html",function(){
           $(".header_add").hide();
           $(".header").css("height",28).find('.left').hide();
           hea.hea();
       });
       $("#footer").load("footer.html");

       // 输入过滤
       var re_input = /<\/?[^>]+>/ig;

       var tel = $("#txt"),tel_e = $(".tel_t"),te_p = $(".tel_p");
       var psd = $("#psd"),wr = $(".wrong"),ps_p = $(".psd_p");
       var rem = $("#remeber");
       var div = $(".lg_div");

       var tel_true = psd_true = false;
       var user_info = {};

       var u = new Cookie({name:"username"}).init();
       // 如果有记住用户名则显示
       if(u.get()){
          tel.val(u.get());
          user_info.id = u.get();
          rem.attr("checked",'true');
       }

       div.on("focus",'input',function(){
            if($(this).val()=='')
                $(this).css("border-color","#5FC100").closest('p').find('.tip').show();
       }).on('blur','input',function(){//失焦时
            $(this).css("border-color","#a2a2a2").closest('p').find('.tip').hide();
        }).on('blur','#txt',function(){//手机验证
            // 输入过滤
            var txt = tel.val().replace(re_input,"");
            // 空格过滤
            txt = txt.replace(/\s/ig,'');
            var ico = tel.closest('.box').find('i');
            if(txt==''){
                te_p.show();
                if(ico.hasClass('on')) ico.removeClass('on');
            }else{
                new userdas({id:txt}).init().search(function(a){
                    //未注册 
                    if(a<=0){
                        tel_true = false;
                        tel.css("border-color","red");
                        if(ico.hasClass('on')) ico.removeClass('on');
                        tel_e.show();
                    }else{//存在
                        tel_true = true;
                        user_info.id = txt;
                        te_p.hide();
                        tel_e.hide();
                        ico.addClass('on');
                    }
                         
                });
                   
            }//else !==""
                 
        }).on('click','#login',function(){
            if(!tel_true&&(!u.get())){
                if(tel_true.val()=='')  te_p.show();
            }   
            else{
                if(psd.val()=='') ps_p.show();
                else{
                    var txt = psd.val().replace(re_input,"");
                    user_info.psd = txt;

                    new userdas({id:user_info.id,psd:user_info.psd}).init().check(function(data){
                        if(data==1){
                            var cc = new Cookie({name:"user",data:user_info.id,path:'/'}).init().set();//记录登录状态
                            if(rem.is(":checked")){
                              //记住用户名
                              cc.name = 'username';
                              var day = new Date();
                              day.setYear(day.getFullYear()+10);
                              cc.exp = day.toUTCString();
                              cc.set();

                            }else{//不记住
                              cc.name = 'username';//删除用户名cookie
                              cc.del();
                            }
                              //发送请求 查看用户等级是否为商家管理员 by:lfp
                              $.ajax({
                                url:"http://localhost:10086/searchVIP",
                                type:"post",
                                data:{
                                  userID:user_info.id
                                },
                                success:function(data){
                                  console.log(data);
                                  if(data == "manager"){
                                    window.location.href = 'admin-index.html';
                                  }else if(data == "guest"){
                                     window.location.href = 'user.html';
                                  }
                                  
                                }
                              })                            
                        }else{
                            wr.show();//提示密码错误
                            psd.css('border-color',"red");
                        }
                             
                    });
                }
            }
        });//div 绑定事件

    });//requier inner
});//require config