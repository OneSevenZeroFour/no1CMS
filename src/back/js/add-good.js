/* 
* @Author: Marte
* @Date:   2017-09-21 09:28:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-22 21:21:23
*/
define(['../back/wangEditor/release/wangEditor.min.js'],function(E){

    var editor = new E('#add_intro');
    editor.create();
    
    var imgArr = [];

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
    $('#add_bn').click(didSaveImgs);

    function didSaveImgs(){
        $.ajax({
            url: 'http://localhost:10086/didSaveImgs',
            type: 'GET',
            dataType: 'json'
        })
        .done(function() {
            console.log("success");
        });
    }

    return editor;
});