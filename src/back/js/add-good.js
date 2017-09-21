/* 
* @Author: Marte
* @Date:   2017-09-21 09:28:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-21 09:50:06
*/

define(['../back/wangEditor/release/wangEditor.min.js'],function(wang){
    return {
        // wangEdt:function(){
            init:function(){
                var editor = new wang('#add_intro');
                editor.create();
            },
            log:function(){
                console.log('wang')
                     
            }
            
        // }
    }    
});

