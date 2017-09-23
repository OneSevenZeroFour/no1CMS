var socket = io('http://localhost:8888');
        var pic = [];
        //登录添加客服
        socket.emit('addCus','ok');

        socket.on('toCus',function(data){
            //在聊天框右侧添加用户名
            if($('#custom .right p').length==0){
                $('#custom .right').append($('<p/>').css('background','#FFFF00').html(data.id).append($('<span/>').html('X')));
            }else{
                $p = $('#custom .right p');
                for(var i=0;i<$p.length;i++){
                    if($p.eq(i).text().slice(0,-1)==data.id){
                        $p.eq(i).css('background','#FFFF00');
                        break;
                    }else if(i==$p.length-1){
                        $('#custom .right').append($('<p/>').css('background','#FFFF00').html(data.id).append($('<span/>').html('X')));
                    }
                }
            }
            //接收信息
            $main = $('#custom .left>main');
            for(var i=0;i<$main.length;i++){
                if($main.eq(i).attr('data-id')==data.id){
                    writeDown($main.eq(i),data.msg,'user');
                    break;
                }else if(i==$main.length-1){
                    data.msg = data.msg.replace(/#([0-9])/g,`<img src='imgs/$1.gif'/>`);
                    $('#custom .left').prepend($('<main/>').css('display','none').attr('data-id',data.id).append($('<p/>').prop('class','user').html(`<span>${data.msg}</span><span>${time().hour}:${time().min}:${time().sec}</span>`)));
                }
            }
            
        });

        //点击用户id打开聊天框
        $('#custom .right').click(function(e){
            if(e.target.tagName.toLowerCase()=='p'){
                $(e.target).css('background','#FFF');
                $('#custom .left>main').each(function(){
                    if($(this).attr('data-id')==$(e.target).text().slice(0,-1)){
                        $(this).css('display','block');
                    }else{
                        $(this).css('display','none');
                    }
                });
            }
        });

        //向用户发送信息
        $('#send').click(function(){
            toSend($('#send'));
        });
        //回车发送消息
        $('#custom .left textarea').keydown(function(e){
            if(e.keyCode==13){
                e.preventDefault();
                toSend($('#send'));
            }
        });
        //发送消息
        function toSend(ele){
            $main = $('#custom .left>main');
            $p = $('#custom .right p');
            $text = ele.closest('footer').prev();
            var _id;
            $main.each(function(){
                if($(this).css('display')=='block'){
                    _id = $(this).attr('data-id');
                    writeDown($(this),$text.val(),'self');
                }
            });
            //回复时取消高亮
            for(var i=0;i<$p.length;i++){
                if($p.eq(i).text().slice(0,-1)==_id){
                    $p.eq(i).css('background','#fff');
                    break;
                }
            }
            var msg = {
                id:_id,
                msg:$text.val()
            }
            socket.emit('cusSend',msg);
            $text.val('').focus();
        }

        //机器人自嗨
        var derail = true;
        socket.on('robot',function(data){
            if((data.der&&derail)||(!data.der&&!derail)){
                derail = false;
                $main = $('#custom .left>main');
                for(var i=0;i<$main.length;i++){
                    if(!$main.eq(i).attr('data-id')){
                        writeDown($main.eq(i),data.text,'user');
                        break;
                    }
                }
            }
        });

        //表情框显示
        $('#custom .face').click(function(e){
            e.stopPropagation();
            $('#custom ._two').css('display','block');
        });
        //表情包点击
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

        //地狱、保存上传过的图片的路径并写入页面
        function hell(data){
            data.forEach(function(item){
                pic.push('../html/imgs/'+item);
                $main = $('#custom .left>main');
                for(var i=0;i<$main.length;i++){
                    if($main.eq(i).css('display')=='block'){
                        writeDown($main.eq(i),'<img src="imgs/'+item+'">','self');
                        break;
                    }
                }
                var cid = $('#custom .left main').attr('data-id');
                socket.emit('cusSend',{
                    id:cid,
                    msg:'<img src="imgs/'+item+'">'
                });
            }); 
        }
        //点击任意地方表情框消失
        document.onclick = function(){
            $('#custom ._two').css('display','none');
        }
        //客服下线
        window.onunload = function(){
            socket.emit('overCus',pic);
        }
        //用户下线修改页面
        socket.on('delUser',function(data){
            $('#custom .right p').each(function(){
                if($(this).text().slice(0,-1)==data){
                    $(this).remove();
                }
            });
            $main = $('#custom .left>main');
            for(var i=0;i<$main.length;i++){
                if($main.eq(i).attr('data-id')==data){
                    if($main.eq(i).css('display')=='block'){
                        $main.eq($main.length-1).css('display','block');
                        writeDown($main.eq($main.length-1),'当前正在聊天的用户突然人间蒸发了#1','user');
                    }
                    $main.eq(i).remove();
                    break;
                }
            }
        });

        //驱逐用户
        $('#custom .right').click(function(e){
            if(e.target.tagName.toLowerCase()=='span'){
                socket.emit('tUser',$(e.target).parent().text().slice(0,-1));
                $('#custom .left main').each(function(){
                    if($(this).attr('data-id')==$(e.target).parent().text().slice(0,-1)){
                        $(this).remove();
                        $('#custom .left main').eq($('#custom .left main').length-1).css('display','block');
                    }
                });
                $(e.target).parent().remove();
            }
        });

        //写入信息
        function writeDown(ele,val,attr){
            val = val.replace(/#([0-9])/g,`<img src='imgs/$1.gif'/>`);
            ele.append($('<p/>').prop('class',attr).html(`<span>${val}</span><span>${time().hour}:${time().min}:${time().sec}</span>`)).scrollTop(ele[0].scrollHeight);
        }

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