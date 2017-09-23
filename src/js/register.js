/* 
* @Author: Marte
* @Date:   2017-09-04 09:11:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 13:22:53
*/

require(['config'],function(){
    require(['jq','headjs','fix','user'],function(jQ,hea,fixjs){
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

        // 正则匹配
        var reg_tel = /^1[3458][\d]{9}$/;
        var reg_psd = /^[\w\.?!\+`\&\*\(\)\-\^\%\$\#\@\,\/\\;:\'\"\<\>=]{6,20}$/;

        // 元素获取
        var tel = $("#txt"),tel_t = $(".reg .tel_t"),tel_e = $(".reg .tel_exist"),tel_p = $(".reg .tel_p");
        var code = $("#v_code_input"),c_t = $(".reg .c_t");
        var psd = $("#psd"),p_t = $(".reg .psd_t"),p_e = $(".reg .tips_err");
        var psd_s  = $("#psd_sure"),p_st = $(".reg .psd_st"),p_se = $(".reg .s_tips_err");
        var ag = $("#agree");
        var bn  = $("#submit");
        var div = $(".reg");
        var tv_div = $(".tv");

        //tab切换
        var tab_li = $(".reg_li");
        tab_li.on("click",function(){
            tab_li.removeClass('on');
            $(this).addClass('on');
            if($(this).index()==0){
                div.show(); tv_div.hide();
            }else{
                div.hide();
                tv_div.show();
            }
        })

        // 默认勾选同意
        ag.attr("checked",'true');
        var reg_info = {};
        // 验证码
        var v_cd = $("#v_code");
        var v_str = '';
        createVCode();           

        // 信息正确与否标志
        var tel_true = psd_true = psd_s_true = false;

        div.on("click",'#v_code,#v_code_a',function(){ // 刷新验证码
            createVCode();
        }).on('focus','input',function(){//输入时
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
                tel_true = false;
                tel_p.show();
                if(ico.hasClass('on')) ico.removeClass('on');
            }else{
                if(!reg_tel.test(txt)){
                    //防止输入正确之后又回去更改成错误的
                    tel_true = false;
                    if(ico.hasClass('on')) ico.removeClass('on');

                    tel_t.show();
                }
                else{
                    new userdas({id:txt}).init().search(function(a){
                        //已被注册 
                        if(a>0){
                            tel_true = false;
                            if(ico.hasClass('on')) ico.removeClass('on');
                            tel_e.show();
                        }else{//新用户
                            tel_true = true;
                            reg_info.id = txt;
                            tel_t.hide();
                            tel_e.hide();
                            ico.addClass('on');
                        }
                             
                    });
                   
                }//else
            }//else !==""
            
                 
        }).on('blur','#psd',function(){//密码验证   
            // 输入过滤
            var txt = psd.val().replace(re_input,"");
            var ico = psd.closest('.box').find('i');

            if(txt==''){
                psd_true = false;
                p_t.show();
                if(ico.hasClass('on')) ico.removeClass('on');
            }else{
                if(!reg_psd.test(txt)){
                    psd_true = false;
                    p_e.show();
                    if(ico.hasClass('on')) ico.removeClass('on');
                }
                else{
                    psd_true = true;
                    p_e.hide();
                    p_t.hide();
                    ico.addClass('on');
                }
            }//else - !==''
                      
        }).on('blur','#psd_sure',function(){//密码确认
            var txt = psd_s.val();
            var ico = psd_s.closest('.box').find('i');

            if(txt==''){
                psd_s_true = false;
                p_st.show();
                if(ico.hasClass('on')) ico.removeClass('on');
            }else{
                if(!(txt===psd.val()&&txt!=''&&psd.val()!='')){
                    psd_s_true = false;
                    p_se.show();
                    if(ico.hasClass('on')) ico.removeClass('on');
                }           
                else{
                    psd_s_true = true;
                    reg_info.psd = txt;
                    p_se.hide();
                    p_st.hide();
                    ico.addClass('on');
                }
            }
                 
        }).on("click","#submit",function(){ // 提交  
            // 不同意协议
            if(!ag.is(":checked")){
                alert("我就不写那么多样式了，选择已阅读同意才能注册。");
                return false;
            }
            // 验证码错误
            if(code.val().trim().toLowerCase()!==v_str.toLowerCase()){
                c_t.show();
                createVCode();
                return false;
            }
            if(!(tel_true&&psd_true&&psd_s_true)){
                if(!tel_true) tel_t.show();
                if(!psd_true) p_t.show();
                if(!psd_s_true) p_st.show();
                 console.log(psd_true)
                return false;
            }
            new userdas({id:reg_info.id,psd:reg_info.psd}).init().insert(function(data){
                alert(data);   
                window.location.href = 'login.html';                  
            });

        })     

        // 生成验证码
        function createVCode(){
            v_str = '';
            v_cd.html('');
            for(var i=0;i<4;i++){
                var obj = ranNum(i);
                v_str += obj.char;
                     
                var fontS  = obj.ita==0?'normal':'italic';
                v_cd.append($(`<span>${obj.char}</span>`).css({
                        top:obj.top,
                        left:obj.left,
                        "font-size":obj.size,
                        "font-style":fontS,
                        "font-weight":obj.weight
                    }));
                    
            }
        }
        // 验证码随机
        function ranNum(i){
            var str = 'abcdefghigklmnopqrstuvwxyz0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ';
            var ran = parseInt(Math.random()*(str.length-1));
            var obj = {};
            obj.char = str[ran];
            var ran_font = parseInt(Math.random()*6)+14;
            obj.size = ran_font;
            var ran_i = parseInt(Math.random()*2);
            obj.ita = ran_i;
            var ran_strong  = (parseInt(Math.random()*4)+8)*100;
            obj.weight = ran_strong;
            var top_range = 30-ran_font*1;
            var ran_top = parseInt(Math.random()*top_range);
            obj.top = ran_top;
            var ran_left = parseInt(Math.random()*15)+i*20;
            obj.left = ran_left;

            return obj;
        }

    });
});