/* 
* @Author: Marte
* @Date:   2017-09-21 09:28:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 15:03:14
*/
define(['../back/wangEditor/release/wangEditor.min.js'],function(E){

    var editor = new E('#add_intro');
    editor.create();
    
    var imgArr = [];

    /*添加自定义 上传图片 按钮*/
    var $btn = $('<input>').attr({
        id: 'getEditorHtml',
        type: 'file',
        name: 'img',
        accept: 'image/png,image/gif,image/jpeg',
        multiple: 'multiple'
    });
    $('.w-e-toolbar').append($btn);
    $('#getTxt').click(function(){
        console.log(editor.txt.html()) 
    });
    $btn.change(function(event) {
        var formData = new FormData();  
        var $cont = $('.w-e-text');
        for(var j = 0; j < $btn[0].files.length ; j++){
            imgArr.push($btn[0].files[j]);
        } 
        for(var i = 0; i < $btn[0].files.length ; i++){
            formData.append('img',$btn[0].files[i]);            
        }
              
             
        $.ajax({
            url: 'http://localhost:10086/uploadToTmp',
            type: 'POST',
            data: formData,
            cache: false,                              
            processData: false,
            contentType: false
        })
        .done(function(res) {
            var arr = JSON.parse(res)['data'];
            console.log(arr);
            arr.forEach(function(item){
                console.log(item);
                     
                var img = `<img src="http://localhost:10086/${item.destination}/${item.filename}" />`;
                // console.log(img);
                     
                editor.txt.html(editor.txt.html().slice(0,-8)+img+'<br></p>');
            });
        });
    });

    /*删除未保存的临时图片*/
    function didUnsaveImgs(){
        $.ajax({
            url: 'http://localhost:10086/didUnsaveImgs',
            type: 'GET',
            dataType: 'json',
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        });        
    }
    /*保存临时图片至*/
    /*必须在操作数据库前调用*/
    function didSaveImgs(){
        console.log('didSaveImg');
             
        $.ajax({
            url: 'http://localhost:10086/didSaveImgs',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(data) {

            console.log(data['status']);
            var oldHTML = editor.txt.html();
            var reg = /<img[^>]+>/g;
            var tmps = oldHTML.match(reg);
            var news = tmps.map(function(item){
                return item.replace(data['data']['oldPath'],data['data']['newPath']);
            });
            var newHTML = oldHTML;
            for(let i = 0; i < tmps.length ; i++){
                newHTML = newHTML.replace(tmps[i],news[i]);
            }
            editor.txt.html(newHTML);
            // tmps.forEach()
            // oldHTML.replace('')
            console.log(tmps)
                 
        })
        .fail(function(){
            console.log("error");   
        });
    }

    /*导出处理图片的方法*/
    editor.didSaveImgs = didSaveImgs;
    editor.didUnsaveImgs = didUnsaveImgs;
    return editor;
});