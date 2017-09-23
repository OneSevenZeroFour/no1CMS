/* 
* @Author: Marte
* @Date:   2017-09-21 09:28:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-22 15:58:23
*/

define(['./wangEditor/release/wangEditor.min.js'],function(wang){
    return {
        // wangEdt:function(){
            init:function(){
                var editor = new wang('#add_intro');
                editor.create();
                this.editor = editor;
                return this;
            },
            log:function(){
                console.log(this.editor.txt.html().slice(0,-4));
                
            }
            
        // }
    }    
});

