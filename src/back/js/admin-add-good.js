/* 
* @Author: Marte
* @Date:   2017-09-20 15:52:34
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 17:45:25
*/

var name = $('.edit_name');
var brand = $('.add_brand');
var det = $(".edit_det");   

var E = window.wangEditor;
var editor2 = new E('#add_intro');

editor2.create();

$("#add_bn").on('click',function(e){
    e.preventDefault();
    // alert(det.val());
})
