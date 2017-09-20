/* 
* @Author: Marte
* @Date:   2017-09-02 12:04:42
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 21:20:44
*/

define(['cookie','user','da','socket'],function(a,b,c,io){
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
            
        },//fixF
        custom:function(){
            var other = '';
            var flag = true;
            var _left = '';
            var _top = '';
            var socket = io('http://localhost:8888');
            function medium(){
                //拖拽
                $('#custom>p').mousedown(function(e){
                    var x = e.clientX - $('#custom')[0].offsetLeft;
                    var y = e.clientY - $('#custom')[0].offsetTop;
                    document.onmousemove = function(e){
                        e.preventDefault();
                        var _x = e.clientX-x;
                        var _y = e.clientY-y;
                        if(_x<0){
                            _x = 0;
                        }else if(_x>window.innerWidth-$('#custom')[0].offsetWidth-17){
                            _x=window.innerWidth-$('#custom')[0].offsetWidth-17;
                        }
                        if(_y<16){
                            _y = 16;
                        }else if(_y>window.innerHeight-$('#custom')[0].offsetHeight){
                            _y=window.innerHeight-$('#custom')[0].offsetHeight;
                        }
                        $('#custom').css({'left':_x,'top':_y});
                    }
                    document.onmouseup = function(){
                        document.onmousemove = null;
                    }
                });

                //缩小、放大、关闭
                $('#custom>p').click(function(e){
                    if(e.target.className=='min'){
                        other = $('#custom').html();
                        _left = parseInt($('#custom').css('left'));
                        _top = parseInt($('#custom').css('top'));
                        $('#custom').animate({'width':214,'height':46,'left':window.innerWidth-214,'top':window.innerHeight-46},function(){
                            $('#custom').html(`<p class='toMin'><img src='../imgs/kefu.jpg'/><span>琪琪</span></p>`).css({'border':'1px solid #c8c7c6','border-radius':'0'});
                            flag = false;
                        });
                    }else if(e.target.className=='max'){

                    }else if(e.target.className=='close'){
                        $('#custom').css('display','none');
                    }
                });

                //tab切换
                $p = $('#custom .right p');
                $div = $('#custom .right>div');
                $p.on('click','span',function(){
                    $p.find('span').css('border-bottom','1px solid #d5d5d5');
                    $(this).css('border-bottom','0 none');
                    $div.css('display','none').eq($(this).index()).css('display','block');
                });

                //发送信息
                $('#send').click(function(){
                    socket.emit('sendMsg',$(this).closest('footer').prev().val());
                });
                socket.on('getMsg',function(data){
                    
                });
            }
            //绑定事件
            medium();
            //点击显示聊天窗口
            $('#online').click(function(){
                $('#custom').css('display','block');
            });
            //结束会话
            $('#over').click(function(){
                $('#custom').css('display','none');
            });
            //缩小后还原
            $('#custom').click(function(){
                if(flag){
                    return;
                }
                $('#custom').html(other).css({'border':'1px solid #5f6467','border-radius':'6px'}).animate({'width':614,'height':506,'left':_left,'top':_top});
                medium();
                flag = true;
            });
        }
    }//return
});//defined