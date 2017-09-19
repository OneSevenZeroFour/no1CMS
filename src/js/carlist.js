/* 
* @Author: Marte
* @Date:   2017-09-06 20:54:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-14 20:20:46
*/

require(['config'],function(){
    require(['headjs','sear','fix','jq','user','cookie','da'],function(hea,sse,fixjs){
             
            $("#fixx").load("fix.html",function(){
                fixjs.fixF();
            });
            $("#header").load("header.html",function(){
                hea.hea();
                $(".left").hide();
            });
            $("#footer").load("footer.html");

            var emptyy = $(".empty_div");
            var listt = $(".carlist");
            var ul = listt.find(".car_ul");

            var cc = new Cookie({name:"user"}).init();
            
            var u = cc.get();                    
            
            emptyy.hide();listt.hide();
                      
// -------------------------------登录 读mysql-----------------------------
            if(u){
                var user = new userdas({id:u}).init();
                user.car_get(function(data){
                    //没有数据
                    if(data==''){
                        emptyy.show();
                        listt.hide();
                    }
                    else{
                        if(data.num==0){//空
                            emptyy.show();
                            listt.hide();
                        }else{
                            $(".cart_count .how_many").html(data.num);
                            var arr_car = $.parseJSON(data.car)
                            // 生成列表
                            create_car(arr_car);
                        }
                    }
                });
            }
// ----------------------------不登录 读cookie-----------------------------
            else{
                var cookie = new Cookie({name:'cnum'}).init();
                var has = cookie.get();
                     
                if(has){

                    $(".cart_count .how_many").html(has);

                    cookie.name = 'carlist';
                    var dass = cookie.get();
                         
                    if(dass){//cookie存在
                        var arr_car = $.parseJSON(dass);
                        // 生成列表
                        create_car(arr_car);
                    }else{
                        emptyy.show();
                        listt.hide();
                    }

                }else{//没有数据
                    emptyy.show();
                    listt.hide();
                }
            }//else - 不登录

// -------------------------------- 吸顶 ---------------------------------
            var fix_pay = $(".cart_count .pay");
            
            var f_top = fix_pay.prev().offset().top + fix_pay.prev().height();
            var f_left = fix_pay.prev().offset().left-8;                 
            $(window).on("scroll",function(){
                     
                if($(window).scrollTop()<=f_top-$(window).height()){
                    fix_pay.css({
                        position:"fixed",
                        bottom:0,
                        left:0,
                        width:'100%',
                        padding:'0 '+f_left+'px'
                    }).find(".del_fix").hide();
                    fix_pay.find(".count_div").show();
                }else{
                    fix_pay.css({
                        position:"relative",padding:0
                    }).find(".del_fix").show();
                    fix_pay.find(".count_div").hide();
                }
           }); 
            
// ----------------------------- 清空购物车 ------------------------------
            var clear_all = $(".pay .del_fix");
            var all_ch = $(".tit_ul .check input,.pay .choose input");
            clear_all.on("click",function(){
                if(all_ch.eq(0).is(":checked")&&all_ch.eq(1).is(":checked")){
                    if(u=cc.get()){//登录
                        new userdas({id:u}).init().car_set();
                    }else{
                        new Cookie({name:'carlist'}).init().del();
                        new Cookie({name:'cnum'}).init().del();
                    }
                    ul.empty();
                    listt.hide();
                    emptyy.show();
                }else return false;
            });
// -------------------------------购物车数量加减---------------------------
            function num_deal(){
                // 数量增减
                var num_sub = $(".num_p .sub");
                var num = $(".num_p .num_in");
                var num_add = $(".num_p .add");

                var sum_money = $(".cart_count .sum");
                var save_money = $(".cart_count .save");
                var pay_money = $(".cart_count .all_sum");
                
                // 数量输入框处理 只限1以上数字
                num.on("keyup",function(){
                  if(/\D/.test($(this).val())||$(this).val()<=0){//非数字
                    var txt = $(this).val().replace(/\D/g,'');
                    if(txt === ''||txt<=0) txt = 1;
                    $(this).val(txt);                         
                  }
                }).on("change",function(){
                    if($(this).val()>1&&$(this).prev().hasClass('limit')) 
                        $(this).prev().removeClass('limit');
                    else if($(this).val()<=1&&(!$(this).prev().hasClass('limit')))
                        $(this).prev().addClass('limit');

                    var li = $(this).closest('li');
                    var pm = pay_money.html() - li.find('.count').html();

                    update(li.attr('idx'),$(this).val());
                    li.find(".count").html(li.find(".sale").html()*$(this).val());
                    pay_money.html(pm*1+li.find(".count").html()*1);
                });

                // 数量增减
                num_sub.on("click",function(){
                    var next = $(this).next();
                    if($(this).hasClass('limit')) return false;
                    if(next.val()<=1) {
                        $(this).addClass('limit');
                        return false;
                    }
                    next.val(next.val()-1);
                    if(next.val()<=1) 
                        $(this).addClass('limit');

                    var li = $(this).closest('li');
                    var pm = pay_money.html() - li.find('.count').html();
                    //注意顺序
                    li.find(".count").html(li.find(".sale").html()*next.val());
                    update(li.attr("idx"),next.val());
                });
                num_add.on("click",function(){  
                    var prev = $(this).prev() ;                       
                    prev.val(prev.val()*1+1);
                    if(prev.prev().hasClass('limit'))
                        prev.prev().removeClass('limit');

                    var li = $(this).closest('li');    
                    var pm = pay_money.html() - li.find('.count').html();
                         
                    li.find(".count").html(li.find(".sale").html()*prev.val());
                    update(li.attr("idx"),prev.val());                 
                }); 
            }  
// -------------------------------- 购买 选择 --------------------------------
            function choose_all(){

                var cbs = $(".good .cb");
                // var all_ch = $(".tit_ul .check input,.pay .choose input");

                var sum_money = $(".cart_count .sum");
                var save_money = $(".cart_count .save");
                var pay_money = $(".cart_count .all_sum");
                var hmm = $(".cart_count .how_many");

                // 什么时候使用attr()，什么时候使用prop()？
                // 1.添加属性名称该属性就会生效应该使用prop();
                // 2.是有true,false两个属性使用prop();
                // 3.其他则使用attr();
                
                // 默认全选
                all_ch.prop("checked",true);
                cbs.prop("checked",true);

                cbs.on("change",function(){
                    for(var i=0;i<cbs.length;i++){
                        if(!(cbs.eq(i).is(":checked"))){
                            all_ch.prop("checked",false);
                            break;
                        }
                    }
                    if(i==cbs.length)
                        all_ch.prop("checked",true);
                    var paym = 0,summ = 0,hm = 0;
                    for(var i=0;i<cbs.length;i++){
                        if(cbs.eq(i).is(":checked")){
                            var li = cbs.eq(i).closest('li');
                            summ += li.find(".sale").attr("oringin")*li.find(".num_in").val();
                            paym += li.find(".count").html()*1;
                            hm += li.find(".num_in").val()*1;                                 
                        }
                    }
                    sum_money.html(summ);
                    save_money.html(summ-paym);
                    pay_money.html(paym);
                    hmm.html(hm);
                });
                all_ch.on("change",function(){
                    if($(this).is(":checked")){
                        all_ch.prop("checked",true);  
                        cbs.prop("checked",true);

                        var paym = 0,summ = 0,hm = 0;
                        for(var i=0;i<cbs.length;i++){
                            var li = cbs.eq(i).closest('li');
                            summ += li.find(".sale").attr("oringin")*li.find(".num_in").val();
                            paym += li.find(".count").html()*1;
                            hm += li.find(".num_in").val()*1;
                        }
                        sum_money.html(summ);
                        save_money.html(summ-paym);
                        pay_money.html(paym);
                        hmm.html(hm);
                    }
                    else {
                        all_ch.prop("checked",false);
                        cbs.prop("checked",false);
                        sum_money.html(0);
                        save_money.html(0);
                        pay_money.html(0);
                        hmm.html(0);
                    }
                });
            }     
// --------------------------------删除商品------------------------------
            function dele_good(){
                var de = $(".good .dele .ico");
                de.on("click",function(){
                    var li = $(this).closest('li');
                    var idx = li.attr("idx");
                    li.remove();
                    update(idx,0);    
                    pay_init(); 
                });
            }          
// ---------------------------------更新数据-----------------------------
            function update(id,num){
                var arr_car = [];

                // 如果有登录应该把购物车信息写到个人表格里
                if(u=cc.get()) {
                    // 先获取原数据
                    var user =  new userdas({id:u}).init();
                    user.car_get(function(data){
                    try{//购物车中已有商品
                        arr_car = $.parseJSON(data.car);
                        for(var i=0;i<arr_car.length;i++){
                            if(arr_car[i].idx===id){
                                user.cn = data.num - arr_car[i].num;
                                                                                                               
                                if(num==0){
                                    arr_car.splice(i,1);//删除商品
                                } 
                                else{//改变数量
                                    arr_car[i].num = num;
                                    user.cn = user.cn*1 + num*1;
                                }
                                break;
                            }
                        }//for
                        // 更新数据                        
                        $("#fix_car .car_num").html(user.cn);                        
                        user.car = JSON.stringify(arr_car);
                        user.car_set();
                             
                        if(user.cn==0) {                          
                          emptyy.show();
                          listt.hide();
                        }

                    }catch(err){
                        console.log(err.message);
                    }

                  });                               
                }
    // --------------------------------不登录 更新cookie-------------------------------------
                else{
                    //购物车cookie
                    var cc_good = new Cookie({name:'carlist'});

                    // 查找之前的购物车cookie
                    var car_origin = cc_good.get();
                       
                    // 购物车中有商品
                    try{
                        var temp = 0;
                        arr_car = $.parseJSON(car_origin);
                        for(var i=0;i<arr_car.length;i++){
                                 
                            if(arr_car[i].idx===id){                                    
                                if(num==0){
                                    temp = arr_car[i].num;
                                    arr_car.splice(i,1);//删除商品
                                } 
                                else{//改变数量
                                    temp = arr_car[i].num;
                                    arr_car[i].num = num;
                                }
                                break;
                            }
                        }

                        // 更新购物车商品cookie
                        cc_good.data = JSON.stringify(arr_car);
                        cc_good.set();      

                        // 更新购物车数量cookie
                        //改变cookie的名字为购物车数量
                        cc_good.name = 'cnum';
                             
                        try{//如果有商品
                          cc_good.data = cc_good.get() - temp + num*1;                          
                        }catch(err){
                            console.log(err.message);
                        }
                        $("#fix_car .car_num").html(cc_good.data);
                        // 设置数量cookie
                        cc_good.set();
                        if(cc_good.data==0) {
                          new Cookie({name:'carlist'}).init().del();
                          new Cookie({name:'cnum'}).init().del();
                          emptyy.show();
                          listt.hide();
                        }
                    }catch(err){
                        console.log(err.massege);
                    }
                  
                }//不登录
                // 选择的数量更新

                var hn = 0 , sn = 0 , pn = 0;
                var cbs = $(".good .cb");
                for(var i=0;i<cbs.length;i++){
                    if(cbs.eq(i).is(":checked")){
                        var li = cbs.eq(i).closest('li');
                        hn += li.find(".num_in").val()*1;
                        sn += li.find(".sale").attr("oringin")*li.find(".num_in").val();
                        pn += li.find(".count").html()*1;
                             
                    }
                }
                $(".cart_count .how_many").html(hn);
                $(".cart_count .sum").html(sn);
                $(".cart_count .save").html(sn-pn);
                $(".cart_count .all_sum").html(pn);
            }
                 
// ------------------------------------生成列表--------------------------------
            function create_car(arr_car){
                emptyy.hide();
                listt.show();
                var total = 0;
                var sum = 0;
                var flag = 0;
                arr_car.forEach(function(item,idx){
                    //总价
                    var count = item.sale*item.num;
                    total += count; 
                    new das({}).getOne(item.idx,(obj)=>{
                        var hre = 'details.html?idx='+obj.id;
                        sum += obj.price * item.num;
                        flag++;
                        var cls = 'sub';
                        if(item.num<=1) cls += ' limit';
                        ul.append(`<li class="clear" idx='${obj.id}'>
                                    <div class="good">
                                        <input type="checkbox" class="cb" />
                                        <div class="c_meg">
                                            <a href="${hre}" target="_blank"><img src="../${obj.img}" alt="" /></a>
                                            <p><a href="${hre}" target="_blank">${obj.name}</a></p>
                                        </div>
                                        <p class="sale" oringin="${obj.price}">${obj.sale}</p>
                                        <p class="num_p">
                                            <span class="${cls}">-</span>
                                            <input type="text" value="${item.num}" class="num_in" />
                                            <span class="add">+</span>
                                        </p>
                                        <p class="count">${count}</p>
                                        <p class="dele"><span class="ico"></span></p>
                                    </div>
                                    <p class="free">
                                        <strong>【赠品】</strong>积分赠送[<span class="score">${(count*0.01).toFixed(2)}</span>]&times;1
                                    </p>
                                </li>`);
                        
                        if(flag==arr_car.length){                                 
                            $(".cart_count .sum").html(sum);
                            $(".cart_count .save").html(sum-total);
                            // 要等列表生成才能获取元素并操作
                            num_deal();
                            choose_all();
                            dele_good();

                            pay_init();
                        }
                    });//getone
                });//forEach
                
                $(".cart_count .all_sum").html(total);
                 
            }//create car
            // 支付吸附静态改变
            function pay_init(){
                f_top = fix_pay.prev().offset().top + fix_pay.prev().height();
                f_left = fix_pay.prev().offset().left-8;
                var f_min = f_top + fix_pay.height();//当可以一页看到立即支付时不吸附
                if(f_min>=$(window).height()){
                    fix_pay.css({
                        position:"fixed",
                        bottom:0,
                        left:0,
                        width:'100%',
                        padding:'0 '+f_left+'px'
                    }).find(".del_fix").hide();
                    fix_pay.find(".count_div").show();
                }else{
                    fix_pay.css({
                        position:"relative",padding:0
                    }).find(".del_fix").show();
                    fix_pay.find(".count_div").hide();
                }
            }
    });//require
});//require config
