/* 
* @Author: Marte
* @Date:   2017-09-02 17:09:46
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-02 18:24:28
*/

function banner(obj){
    var def = {
        imgs,container = '.banner',width=810,height=340,index=0,autoplay=true,page=true,duration=3000,seamless=true,arrow=true}=obj;

    this.con = container;
    this.wid = width;
    this.ht = height;
    this.imgs = imgs;
    this.auto = autoplay;
    this.page = page;
    this.du = duration;
    this.sl = seamless;
    this.len = this.imgs.length;
    this.idx = index;
    this.arrow = arrow;
    this.all_wid = (this.wid-$(this.con).width())/2;
}

banner.prototype.init = function(){
         
    if(this.arrow){
        $(this.con).append($('<span class="prev icof icon-l"></span><span class="next icof icon-right"></span>'));
    }

    var ul = $("<ul class='clear'></ul>").html(this.imgs.map(function(item){
        return `<li><a href=""><img src="${item}"></a></li>`;
    }).join(""));
    $(this.con).append(ul);

    if(this.page){
        var page = $('<div class="page"></div>');
        for(var i=0;i<this.len;i++){
            if(i===this.idx)
                page.append($('<span class="on"></span>'));
            else page.append($('<span></span>'));
        }
        $(this.con).append(page);
    }

    if(this.sl){
        ul.append(ul.children().first().clone(true,true));
        this.len++;
    }

    ul.css({width:this.wid*this.len});

    $(this.con).on("mouseenter",()=>{  
        this.stop();
    }).on("mouseleave",()=>{
        this.move();
    }).on("click",(e)=>{
        if($(e.target).hasClass('prev')){
            if(this.idx<=0) this.idx = this.len-1;
            else this.idx--;
            this.show();
        }else if($(e.target).hasClass('next')){
            var len = this.sl?this.len-1:this.len;
            if(this.idx>=len-1&&(!this.sl)) this.idx = 0;
            else  this.idx++;
            this.show();
        }else if($(e.target).parent().hasClass('page')){
            this.idx = $(e.target).index();
            this.show();
        }

    });

    this.ele = ul;
    this.page = page;
    return this;
}
banner.prototype.move = function(){
    this.timer = setInterval(this.autoFun.bind(this),this.du);
    return this;
}
banner.prototype.stop = function(){
    clearInterval(this.timer);
    return this;
}
banner.prototype.show = function(){  
    if(this.idx>=this.len||this.idx<0){
        if(this.sl){
            this.ele.css("left",0);
            this.idx = 1;
        } 
        else this.idx = 0;        
    }
    var target = -this.idx*this.wid;
    this.ele.stop();
    this.ele.animate({left:target},'slow',function(){
        if(this.sl&&this.idx>=this.len){
            this.ele.css("left",0);
            this.idx = 0;
        }
    });  
    this.page.children().removeClass('on').eq(this.idx).addClass('on');
    if(this.sl&&this.idx>=this.len-1)
        this.page.children().removeClass('on').first().addClass('on');
   
    return this;
}

banner.prototype.autoFun = function(){
    this.idx++;
    this.show();
    return this;
}
