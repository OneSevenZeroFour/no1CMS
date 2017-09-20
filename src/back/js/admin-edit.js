/* 
* @Author: Marte
* @Date:   2017-09-13 17:29:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-13 19:35:36
*/

var idx = location.search.slice(1).split('=')[1];

$.ajax({
    url: 'http:localhost:3000/select_one',
    type: 'POST',
    data: {id: idx},
    success:function(data){
        var obj = JSON.parse(data)[0];
        $("#user-name").val(obj.name);
        $("#user-intro").val(obj.brief);             
    }
});

function updateUser(){
    var name = $("#user-name").val().trim().replace(/</ig,'&lt;').replace(/>/ig,'&gt;');
    var bri = $("#user-intro").val().trim().replace(/</ig,'&lt;').replace(/>/ig,'&gt;');
    if(name=='') return false;
         
    $.ajax({
        url: 'http:localhost:3000/update',
        type: 'POST',
        data: {id:idx,name: name,brief:bri},
        success:function(data){
            console.log(data);                 
        }
    });
    
}