/* 
* @Author: Marte
* @Date:   2017-09-01 19:22:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 13:09:10
*/

define(['cookie','user','da'],function(){
    return {
        sear:function(){
            var txt = $("#sear_txt");
            var ds = $("#sear_datalist");
            var car = $(".car");
            var shop_car = $("#car");

            // 首页接口路径处理
            var local = location.href;

            txt.val("请输入商品名称或货号");

// ------------------------------购物车数量初始化-----------------------------
            var fcn = $(".car .car_num");

            // 查找是否登录
            var cc = new Cookie({name:"user"}).init();
            var u = cc.get();
            // 如果登录直接读取数据库
            if(u){
                var user =  new userdas({id:u}).init();
                
                if(local.indexOf("index.html")>-1)
                    user.api = true;
                user.car_get(function(data){
                    //没有数据
                    if(data=='') fcn.html(0);
                    else fcn.html(data.num);
                });
            }else{//不登录读取cookie
                // 查找之前的购物车cookie
                var num_origin = new Cookie({name:"cnum"}).init().get();
                if(num_origin)  fcn.html(num_origin);
                else fcn.html(0);  
            }


// --------------------------------------搜索---------------------------------
            txt.on("focus",function(){
                txt.val("");
                ds.show();
            }).on("blur",function(){
                if(txt.val().trim()==="")
                    txt.val("请输入商品名称或货号");
                setTimeout(function(){
                    ds.hide();
                }, 500);
            });

            // 历史搜索选择
            ds.on("click",'li',function(){
                if($(this).hasClass('history'))
                    txt.val("请输入商品名称或货号");
                else txt.val($(this).html());
            });

// -----------------------------------搜索栏购物车--------------------------------------
            var def = shop_car.find(".def");
            var list = shop_car.find(".car_list");
            var ul = list.find(".car_ul");
            var sum = $("#car_total");

// -------------------------------------展开购物车-------------------------------------
            car.on("mouseenter",function(){
                $(this).css("border-bottom-width","0").find(".icof").eq(1).removeClass('icon-down').addClass('icon-up');
                $(this).find("#car_enter").css("border-bottom",'none');
                shop_car.show();
                //先清空
                ul.html("");                   
// ----------------------------如果登录直接读取数据库 ------------------------------
                if(u = cc.get()){                         
                    var user =  new userdas({id:u}).init();
                    if(local.indexOf("index.html")>-1)
                        user.api = true;
                    user.car_get(function(data){
                        //没有数据
                        if(data==''){
                            def.show();
                            list.hide();
                        }
                        else{
                            try{
                                var arr_car = $.parseJSON(data.car);
                                     
                                // 总数-鼠标移上去时刷新
                                fcn.html(data.num);
                                create_car(arr_car);
                            }catch(err){
                                def.show();
                                list.hide();
                            }
                        } //else             
                    });//car_get
                }
// --------------------------------不登录读cookie-----------------------------------
                else{
                         
                    //购物车cookie
                    var cc_good = new Cookie({name:'carlist'});
                    var car_origin = cc_good.get();
                         
                    // 购物车中有商品
                    if(car_origin){
                        var arr_car = $.parseJSON(car_origin);
                                                     
                        fcn.html(new Cookie({name:'cnum'}).get());
                        create_car(arr_car);
                    }else{//购物车中无商品
                        def.show();
                        list.hide();
                    }
                         
                }//不登录
            }).on("mouseleave",function(){
                $(this).css("border-bottom-width","1px").find(".icof").eq(1).removeClass('icon-up').addClass('icon-down');
                $(this).find("#car_enter").css("border-bottom",'1px solid #ddd');
                shop_car.hide();
            });//car 事件

            function create_car(arr_car){
                def.hide();
                list.show();
                var total = 0;
                arr_car.forEach(function(item,idx){
                    var ds = new das({}).init();
                    if(local.indexOf("index.html")>-1)
                        ds.api = true;
                    //总价
                    total += item.sale*item.num;
                    if(idx===arr_car.length-1) 
                        sum.html(total).show();  
                    ds.getOne(item.idx,(obj)=>{
                        var src = '../'+obj.img;
                        var hre = 'details.html?idx='+obj.id;
                        if(ds.api){
                            src = obj.img;
                            hre = 'html/details.html?idx='+obj.id;
                        }

                        ul.append(`<li>
                                    <img src='${src}' />
                                    <a href='${hre}' target='_blank'>${obj.name}</a>
                                    <p><span class="unit">${obj.sale}</span>&times;<span class="good_num">${item.num}</span></p>
                                    </li>` );
                        
                    });//getone
                });//forEach
            }//create car

        }//sear
    }//return
});//define

