/* 
* @Author: Marte
* @Date:   2017-09-05 19:26:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 10:00:04
*/

function fly(obj,fn){
    var def = {
        ele = $("#big_img"),
        wid=40,
        h=40,
        t='50%',
        l='50%',
        mid_top='48%',
        mid_left="90%",
        to_top='50%',
        to_left='100%',
        mid_wid=10,
        mid_h=10
    } = obj;
    this.ele = ele;
    this.wid = wid;
    this.h = h;
    this.mw = mid_wid;
    this.mh = mid_h;
    this.t = t;
    this.l = l;
    this.mt = mid_top;
    this.ml = mid_left;
    this.tp = to_top;
    this.tl = to_left;
    this.fn = fn;
    return this;
}

fly.prototype.init= function(){
    $('body').append(this.ele.css({
        width:this.wid,
        height:this.h,
        top:this.t,
        left:this.l,
        position:'absolute',
        "border-radius":"50%",
        'z-index':122
    }));
    return this;
}

fly.prototype.anit = function(){
    this.ele.animate({//一段
        width: this.mw,
        height: this.mh,
        top:this.mt,
        left:this.ml
    },()=>{//二段
        this.ele.animate({
            width: 2,
            height: 2,
            top:this.tp,
            left:this.tl
        },'slow',()=>{
           this.ele.fadeOut();
           if(typeof this.fn==='function'){
            this.fn();
           }
        });
    });//一段
}
