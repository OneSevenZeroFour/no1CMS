/* 
* @Author: Marte
* @Date:   2017-09-05 12:04:09
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 17:31:26
*/

require(["config"],function(){
    require(['headjs','sear','fix','jq','cookie','da','fly','user'],function(heaa,sse,fixjs){
      var fc;
      var fcn;
// ---------------------------------- load公共部分 -----------------------------------
       $("#fixx").load("fix.html",function(){
          fixjs.fixF();
          fc = $("#fix_car");//侧边购物车
          fcn = fc.find(".car_num");//购物车数量
       });
       $("#header").load("header.html",function(){
           heaa.hea();
       });
       $("#search").load("search.html",function(){
          sse.sear();
       });
       $("#nav").load("nav.html",function(){
           $("#nav ul>li").eq(0).addClass('on');
       });
       $("#footer").load("footer.html");


// ----------------------- 根据传参查询数据库 读取数据显示 -----------------------------
       var id = location.search.slice(1).split("=")[1];

       // 查找是否登录
       var cc = new Cookie({name:"user"}).init();
       var u = cc.get();
// --------------------------------------读取数据显示-----------------------------------
        new das({}).init().getOne(id,function(obj){          
          //获取细节图片src     
          var img_datas = obj.imgs.split(";");
          if(img_datas[img_datas.length-1]=='') img_datas.pop();

          //大图
          var img = $("#big_img");
          img.attr("src",'../'+img_datas[0]);
        
          // 小图
          var imgs_con = $(".imgs");
          var ul_wid = 70*img_datas.length;
          var imgs_ul = $("<ul></ul>").css('width',ul_wid).html(img_datas.map(function(item){
                return `<li><img src='../${item}'/></li>`;
          }).join(""));
          imgs_ul.find("li").first().addClass('on');
          imgs_con.find(".img_box").append(imgs_ul);

// ----------------------------点击图片切换显示+左右滑动动画----------------------------
          imgs_con.on("click",'img',function(){
            img.attr("src",$(this).attr("src"));
            imgs_ul.find('li').removeClass('on');
            $(this).closest('li').addClass('on');
          }).on('click','.prev',function(){//左右滑动动画
            var left = imgs_ul.css('left').replace('px','');
            if(left<0&&(!imgs_ul.is(":animated"))){
              imgs_ul.animate({left:left*1+70});
            }
          }).on('click','.next',function(){
            var left = imgs_ul.css('left').replace('px','');
            if(img_datas.length>5&&left>70*(5-img_datas.length)&&(!imgs_ul.is(":animated"))){
              imgs_ul.stop().animate({left:left-70});
            }
          });

// ------------------------------------- 放大镜 -------------------------------------  
        var mag = $("#mag_img img"); 
        var lay  = $("#layer");          
        img.parent().on("mouseenter",function(e){
          mag.attr("src",img.attr("src"));
          // 遮罩宽度完全按比率
          // var ratio = mag.width()/img.width();
          // var wid = img.width()/ratio;
          // var hei = img.height()/ratio;  
          
          // 与官网统一 遮罩为小图的1/4宽高
          // 图片大小的比率是1.1~2.01+        
          var wid = img.width()/4;
          var hei = img.height()/4; 
          lay.css({width:wid,height:hei,'z-index':3});
          mag.parent().show();

        }).on("mouseleave",function(){
          lay.hide();
          mag.parent().hide();
        }).on("mousemove",'img,#layer',function(e){               
          var wid = lay.outerWidth();
          var hei = lay.outerHeight();

          var top = e.offsetY-wid/2;
          var left = e.offsetX-hei/2;

          if($(this).attr("id")=='layer'){
            var top = $(this).position().top + e.offsetY-$(this).height()/2;
            var left = $(this).position().left + e.offsetX-$(this).width()/2;
          }
               
          if(top<0) top = 0;
          if(left<0) left = 0;
          if(top>img.height()-hei) top = img.height()-hei;
          if(left>img.width()-wid) left = img.width()-wid;

          lay.css({top:top,left:left}).show();
          var ratio = mag.width()/img.width();

          mag.css({top:-ratio*top,left:-ratio*left});

        });
// ---------------------------------------------------------------------
          // 商品货号
          $("#tag").html(obj.tag+"-"+obj.id);

          //tv商品
          if(obj.seller==0) $(".tv").show();
          else if(obj.seller==1) $('.ugo_self').show();
          else if(obj.seller==2) $(".bs_self").show();

          // 品牌
          var bd = $(".right .brand a");
          bd.html(obj.brand).attr("href",obj.href);

          // 标题
          var tit = $(".right h2");
          tit.html(obj.name);

          // 商品描述
          var det = $(".descript");
          det.html(obj.det);

          // 现价
          var sale = $("#sale");
          sale.html(obj.sale);

          // 有无优惠
          var save = $(".save");
          var disc = $(".disc");
          var sub = $(".right .sub");
          var sub_ico = $(".left .sub");
          var deli = $(".deli");
          if(obj.price-obj.sale>0||obj.sub||obj.deli){
            save.show();
            if(obj.price-obj.sale>0){
              sub_ico.show().html(obj.price-obj.sale);
              disc.show().find("#price").html(obj.price);
            }
            if(obj.sub)
              sub.show().append(obj.sub);
            if(obj.deli)
              deli.show().append(obj.deli);
          }

// -------------------------------商品数量处理-输入与点击加减--------------------------------
          // 数量增减
          var num_sub = $(".sub_num");
          var num = $("#num");
          var num_add = $("#add_num");

          // 数量输入框处理 只限1以上数字
          num.on("keyup",function(){
            if(/\D/.test($(this).val())||$(this).val()<=0){//非数字
              var txt = $(this).val().replace(/\D/g,'');
              if(txt === ''||txt<=0) txt = 1;
              $(this).val(txt);
              $(".err").fadeIn().css("display",'inline-block');
              setTimeout(function(){
                $(".err").fadeOut();
              }, 1200);
            }
          }).on("change",function(){
            if($(this).val()>1&&num_sub.hasClass('limit')) 
              num_sub.removeClass('limit');
            else if($(this).val()<=1&&(!num_sub.hasClass('limit')))
              num_sub.addClass('limit');
          });

          // 数量增减
          num_sub.on("click",function(){
            if($(this).hasClass('limit')) return false;
            if(num.val()<=1) {
              $(this).addClass('limit');
              return false;
            }
            num.val(num.val()-1);
          });
          num_add.on("click",function(){
            num.val(num.val()*1+1);
            if(num_sub.hasClass('limit'))
              num_sub.removeClass('limit');
          }); 


// -----------------------------------------购物车-------------------------------------
          // 加入购物车
          var add_to_car = $("#add_Car");
          if(obj.stock<=0){
            add_to_car.html("已抢光").css({background:"#cccccc"});
            $(".img .over").show();
          }
          add_to_car.on("click",function(){
            if(obj.stock<=0) return false;
  // -------------------------------------飞入----------------------------------------
            var top = $(this).offset().top;
            var left = $(this).offset().left + $(this).outerWidth();
            var t_top = fc.offset().top+fc.outerHeight()/2-3;
            var t_left = fc.offset().left+fc.outerWidth()/2;
            var mid_t = t_top-30 , mid_l = t_left-10;
            var ele = $("#big_img").clone(true, false);
            new fly({
              ele:ele,
              t:top,
              l:left,
              mid_top:mid_t,
              mid_left:mid_l,
              to_top:t_top,
              to_left:t_left
            },function(){
              //数量改变
              var nnnn = fcn.html()*1+num.val()*1;
              fcn.html(nnnn);
              $(".car .car_num").html(nnnn);
            }).init().anit();

// --------------------------------购物车mySql/Cookie----------------------------------------
            var arr_car = [];
            // 现新加商品 
            var car_now = {idx:id,num:num.val(),sale:obj.sale};

              // 每次点击都先判断有无登录                          
            // 如果有登录应该把购物车信息写到个人表格里
            if(u=cc.get()) {
              // 先获取原数据
              var user =  new userdas({id:u}).init();
              user.car_get(function(data){
                if(data==''){
                  // 还没有任何信息 直接写入
                  arr_car.push(car_now);
                  user.cn = num.val()*1;

                }else{//购物车中已有商品
                  try{
                    arr_car = $.parseJSON(data.car);
                  }catch(err){
                    arr_car = [];
                  }
                  for(var i=0;i<arr_car.length;i++){
                    if(arr_car[i].idx===id){
                      // 购物车中有该商品
                      arr_car[i].num = arr_car[i].num*1 + num.val()*1;
                      break;
                    }
                  }//for
                   //该商品首次加入
                  if(i==arr_car.length) arr_car.push(car_now);
                  // 购物车商品总数更新
                  user.cn = num.val()*1 + user.cn*1;
                       
                       
                }//else

                // 更新数据
                user.car = JSON.stringify(arr_car);
                user.car_set();
              });                               
            }
// --------------------------------不登录则存cookie-------------------------------------
            else{
              //购物车cookie
              var cc_good = new Cookie({name:'carlist'});

              // 查找之前的购物车cookie
              var car_origin = cc_good.get();
                   
              // 购物车中有商品
              if(car_origin){
                arr_car = $.parseJSON(car_origin);
                // 购物车中已有该商品
                for(var i=0;i<arr_car.length;i++){
                  if(arr_car[i].idx===id){
                    // 官网没有数量初始化 所以要+=
                    // arr_car[i].num = num.val()*1;
                    arr_car[i].num = arr_car[i].num*1 + num.val()*1;
                    break;
                  }
                }
                //该商品首次加入
                if(i==arr_car.length){
                  arr_car.push(car_now);
                }
              }else arr_car.push(car_now);//购物车中无任何商品
                   
              // 存购物车商品cookie
              var good_arr = JSON.stringify(arr_car);
              cc_good.data = good_arr;

              // 如果登录，信息存入数据库
              // 如果不登录，也没必要存很久，所以不设时间
              // var day = new Date();
              // day.setYear(day.getFullYear()+10);
              // cc_good.exp = day.toUTCString();
              cc_good.set();      

              // 存购物车数量cookie
              //改变cookie的名字为购物车数量
              cc_good.name = 'cnum';

              // 查找之前的购物车cookie
              var num_origin = cc_good.get();
              if(num_origin){//如果有商品
                cc_good.data = num_origin*1 + num.val()*1;
              }else cc_good.data = num.val()*1;
              // 设置数量cookie
              cc_good.set();
            }//不登录

          });//点击加入购物车
// ---------------------------评情tab--------------------
        var tabs = $(".good_details .left h3 .tab");
        var tabd_s = $(".d_");
        var de_ = $(".det_div");
        tabs.eq(1).find(".com_num").html('('+obj.comments+')');
         
        // 默认显示详情
        de_.find("img").attr('src','../'+obj.de_imgs);
        var liss = de_.find(".det_table .li_t");
        liss.eq(0).html(obj.name).end().eq(1).html(obj.brand).end().eq(2).html(obj.time.split(" ",1)).end().eq(3).html(obj.param.replace(/@/ig,"<br />")).end().eq(4).html(obj.list.replace(/@/ig,"<br />"));
        if(obj.param=='') $(".param_li").hide();     

        tabs.on("click",function(){
          $(this).siblings('.tab').removeClass('on');
          if(!$(this).hasClass('on'))
            $(this).addClass('on');
          var top = tabd_s.eq($(this).index()).offset().top - 50;
          $("body,html").scrollTop(top);
        });

        var pt_ = $(".good_details .left h3");
        // var top_ = pt_.offset().top;
        var top_ = 760;
             
// ---------------------- 吸顶 -----------------------------
        $(window).on("scroll",function(){
            if($(window).scrollTop()>=top_){
              var l_ = ($(window).width()-1000)/2;
              pt_.css({
                position:"fixed",
                top:0,
                left:l_,
                width:1000,
                "border-left":"1px solid #ddd",
                'z-index':1110
              }).find(".fix_info").show().find(".fixt_inum").html(num.val()).end().find(".fixt_sum").html(num.val()*obj.sale);
            
              add_to_car.css({
                position:'fixed',
                top:0,
                right:l_,
                'z-index':1111
              });
            }else{
              pt_.css({
                position:'relative',
                width:'100%',
                "border-left":"none",
                left:0
              }).find(".fix_info").hide();
              add_to_car.css({
                position:'relative',
                'z-index':1,
                right:0
              })
            }
        });

      }); //new das - 读取数据           
// ---------------------------侧边 大家都在看 读取7条数据--------------------------
      var ul_ = $(".watch");
      new das({num:6,page:3}).init().getPage(function(arr,sum){
          ul_.append(arr.map(function(item){                                
              return `<li>
                     <a href="details.html?idx=${item.id}" target='_blank'>
                         <img src="../${item.img}" alt="" />
                         <p class="name">${item.name}</p>
                         <p class="sale">${item.sale}</p>
                      </a>
                 </li>`;
          }).join(""));        
      });//new das


    });//require

});//config

