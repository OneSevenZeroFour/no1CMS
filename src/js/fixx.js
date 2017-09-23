/* 
* @Author: Marte
* @Date:   2017-09-02 12:04:42
* @Last Modified by:   Marte
<<<<<<< HEAD
* @Last Modified time: 2017-09-11 13:10:59
*/

define(['cookie','user','da'],function(){
=======
* @Last Modified time: 2017-09-23 18:02:15
*/

define(['cookie','user','da','socket'],function(a,b,c,io){
>>>>>>> be76d84a936013851c42337d43e79d421354c563
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
            
<<<<<<< HEAD
        }//fixF
=======
        },//fixF
        custom:function(o){
            var other = '';
            var flag = true;
            var _left = '';
            var _top = '';
            var socket = io('http://localhost:8888');
            var pic = [];
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
                    var url = o? '':'../';
                    if(e.target.className=='min'){
                        other = $('#custom').html();
                        _left = parseInt($('#custom').css('left'));
                        _top = parseInt($('#custom').css('top'));
                        $('#custom').animate({'width':214,'height':46,'left':window.innerWidth-214,'top':window.innerHeight-46},function(){
                            $('#custom').html(`<p class='toMin'><img src='${url}imgs/kefu.jpg'/><span>琪琪</span></p>`).css({'border':'1px solid #c8c7c6','border-radius':'0'});
                            flag = false;
                        });
                    }else if(e.target.className=='max'){
                        //放大大大大大大大大，然而没写
                    }else if(e.target.className=='close'){
                        $('#custom').css('display','none');
                    }
                });

                //结束会话
                $('#over').click(function(){
                    $('#custom').css('display','none');
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
                    toSend($(this));
                });
                $('#custom .left textarea').keydown(function(e){
                    if(e.keyCode==13){
                        e.preventDefault();
                        toSend($('#send'));
                    }
                });

                //表情框显示
                $('#custom .face').click(function(e){
                    e.stopPropagation();
                    $('#custom ._two').css('display','block');
                });

                //表情点击
                $('#custom ._two').on('click','img',function(){
                    var idx = $(this).prop('src').indexOf('imgs/');
                    var num = $(this).prop('src').slice(idx+5).slice(0,-4);
                    $text = $('#custom textarea');
                    $text.val($text.val()+'#'+num);
                    $('#custom ._two').css('display','none');
                });

                //图片上传
                $('#file').change(function(){
                    $.ajax({
                        type:"POST",
                        url:"http://localhost:10086/file",
                        cache:false,
                        data:new FormData($('#uploadForm')[0]),
                        processData: false,
                        contentType: false,
                        success:function(data){
                            hell(data);
                        }
                    });
                }); 
            }

            //发送消息
            function toSend(ele){
                $text = ele.closest('footer').prev();
                var cid = $('#custom .left main').attr('data-id');
                socket.emit('userSend',{
                    id:cid,
                    msg:$text.val()
                });
                writeDown($text.val(),'self');
                $text.val('').focus();
            }

            //地狱、保存上传过的图片的路径并写入页面
            function hell(data){
                var url = o? 'html/':'';
                var _url = o? '':'../';
                data.forEach(function(item){
                    pic.push(_url+'html/imgs/'+item);
                    writeDown('<img src="'+url+'imgs/'+item+'">','self','a');
                    var cid = $('#custom .left main').attr('data-id');
                    socket.emit('userSend',{
                        id:cid,
                        msg:'<img src="imgs/'+item+'">'
                    });
                }); 
            }

            //点击任意地方表情框消失
            document.onclick = function(){
                $('#custom ._two').css('display','none');
            }
            //绑定事件
            medium();
            //接收信息
            socket.on('toUser',function(data){
                writeDown(data.msg,'cus');
            });
            //绑定客服
            socket.on('setCus',function(data){
                $('#custom .left main').attr('data-id',data);
            });
            //没有客服在线
            socket.on('no',function(data){
                var val = '客服人员全躺尸了，暂时没有人能给予回复，请回去洗洗睡吧！';
                writeDown(val,'cus');
            });
            //客服换人提示
            socket.on('return',function(data){
                var val = '原客服已阵亡，本网站表示已经免费帮你换一个客服聊天#0';
                writeDown(val,'cus');
                $('#custom .left main').attr('data-id','');
            });
            //被客服飞
            socket.on('getOut',function(data){
                $('#custom .left main').append($('<h4/>').html(`<span>---------- 本次会话已结束！----------</span><span>${time().hour}:${time().min}:${time().sec}</span>`)).attr('data-id','');
                $main = $('#custom .left main');
                $main.scrollTop($('#custom .left main')[0].scrollHeight);
            });
            //用户下线
            window.onunload = function(){
                var cid = $('#custom .left main').attr('data-id');
                var a = {
                    id:cid,
                    pic:pic
                }
                if(o){
                    a.idx = true;
                }
                socket.emit('overUser',a);
            }
            //信息写入
            function writeDown(val,attr,a){
                if(o){
                    val = val.replace(/#([0-9])/g,`<img src='imgs/$1.gif'/>`);
                    if(!a){
                        val = val.replace('imgs/','html/imgs/');
                    }
                }else{
                    val = val.replace(/#([0-9])/g,`<img src='imgs/$1.gif'/>`);
                }
                $('#custom .left main').append($('<p/>').prop('class',attr).html(`<span>${val}</span><span>${time().hour}:${time().min}:${time().sec}</span>`));
                $main = $('#custom .left main');
                $main.scrollTop($('#custom .left main')[0].scrollHeight);
            }
            //点击显示聊天窗口
            $('#online').click(function(){
                $('#custom').css('display','block');
                //欢迎语句的时间
                $('#custom .first').html(time().hour+':'+time().min+':'+time().sec);
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
            //返回当前时间
            function time(){
                var now = new Date();
                var hour = now.getHours();
                var min = now.getMinutes();
                var sec = now .getSeconds();
                hour = hour<10? '0'+hour:hour;
                min = min<10? '0'+min:min;
                sec = sec<10? '0'+sec:sec;
                return {hour:hour,min:min,sec:sec}
            }
        }
>>>>>>> be76d84a936013851c42337d43e79d421354c563
    }//return
});//defined