/* 
* @Author: Marte
* @Date:   2017-09-01 12:04:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 16:16:49
*/

require(['config'],function(){
    require(['headjs','sear','fix','jq','banner','da','cookie'],function(hea,sse,fixjs){
        jQuery(document).ready(function($) {  
// ----------------------------------load 公共模块 ------------------------------             
            $("#fixx").load("html/fix.html",function(){
                fixjs.fixF();
                fixjs.custom('o');
                // 所有a的href 加html/
                $('#fixx a').attr("href",function(){
                    return 'html/'+$(this).attr("href");
                });
                $("#fixx link").attr("href",function(){
                    return $(this).attr("href").replace("../","");
                });
                $('#online').attr('href','#');
                $('#custom ._two img').each(function(){
                    $(this).prop('src','html/'+$(this).attr('src'));
                });
                $('#custom .normal img').attr('src',$('#custom .normal img').attr('src').replace('../',''));
                $('#cnm').remove();
            });
            $("#header").load("html/header.html",function(){
                // img src不要../
                $('img').attr("src",function(){
                    return $(this).attr("src").replace("../",'');
                }); 
                $("#header link").attr("href",function(){
                    return $(this).attr("href").replace("../","");
                });
                // 所有a的href 加html/
                $('#header a').attr("href",function(){
                    return 'html/'+$(this).attr("href");
                }); 
                hea.hea();
            });
            $("#search").load("html/search.html",function(){
                $("#search link").attr("href",function(){
                    return $(this).attr("href").replace("../","");
                });
                $("#search h1 a").attr({"href":"#","target":"_blank"});
                $("html").append('<script type="text/javascript" src="js/search.js"></script>'); 
                sse.sear();
                $("#car .car_ul img").attr("src",function(){
                    return $(this).attr("src").replace("../",'');
                });
            });
            $("#nav").load("html/nav.html .nav",function(){
                $("#nav ul>li").eq(0).addClass('on').find("a").attr("href","#");
                $("html").append('<script type="text/javascript" src="js/nav.js"></script>');
                // 所有a的href 加html/
                $('#nav a').attr("href",function(){
                    return 'html/'+$(this).attr("href");
                }); 
            });
            $("#footer").load("html/footer.html .footer",function(){
                $("#footer a").attr("href","#");
            });
                
            // 已登录
            var user = new Cookie({name:"user"}).init().get();
            if(user){
                $('.header a').attr("href",function(){
                    if($(this).attr('href').indexOf("html/")<0)
                        return 'html/'+$(this).attr("href");
                    else return $(this).attr("href");
                }); 
            }          

// -----------------------------------轮播图--------------------------------------
            var ban = $("#main .banner");
            new banner({imgs:['./imgs/home_ba1.jpg','./imgs/home_ba2.jpg'],container:'#main .banner',width:1920,height:340,duration:4000}).init().move();   

            var arr_lef = ($(document).width()-1000)/2;
            ban.find(".prev").css("left",arr_lef);     
            ban.find(".next").css("right",arr_lef);     
            var ul_left = (1920-$(document).width())/2;
            ban.find("ul").css("margin-left",-ul_left);
            ban.on("mouseenter",function(){
                ban.find(".prev,.next").fadeIn();
            }).on("mouseleave",function(){
                ban.find(".prev,.next").fadeOut();
            });



            //右1小动画
            $(".tv_enters").on("mouseenter",'a',function(){
                $(this).find('.icof').stop().animate({"margin-top":-3});
            }).on("mouseleave",'a',function(){
                $(this).find('.icof').stop().animate({"margin-top":0});
            });

// --------------------------每日精选 列表生成+淡入淡出------------------------
            var ul_show = $(".sele_best .show_");
            var ul_bn = $(".sele_best .show_bn");
            new das({api:true,num:6,page:1,orderBy:'(price-sale)',sortIs:'price-sale>0 and stock=1',sortWay:'DESC'}).init().getPage(function(arr,sum){
                    createBanList(arr);
                    ul_show.find('li').first().fadeIn();
                    var li_ = ul_show.find('li');
                    var bn_ = ul_bn.find('li');
                    ul_bn.width(bn_.length*86);

                    var ban_idx = 1;
                    var las_idx = 0;
                    var timer = setInterval(function(){
                        banF();
                    },2500);

                    ul_show.parent().on("mousemove",function(){
                        clearInterval(timer);
                    }).on('mouseleave',function(){
                        timer =  setInterval(function(){
                            banF();
                        },2500);
                    });
                    //鼠标停在按键上
                    ul_bn.on("mousemove",'li',function(){
                        las_idx = $(this).siblings('.on').index();
                        ban_idx = $(this).index();
                             
                        $(this).addClass('on').siblings('li').removeClass('on');
                        clearInterval(timer);
                        li_.eq(las_idx).stop().fadeOut().end().eq(ban_idx).stop().fadeIn();
                    }).on('mouseleave',function(){//鼠标离开按键ul
                        las_idx = $(this).siblings('.on').index();
                        ban_idx = las_idx*1 + 1;
                        if(ban_idx===li_.length) ban_idx = 0;
                        timer = setInterval(function(){
                            banF();
                        },2500);
                    });
                    //上下切换
                    ul_show.parent().on('click','.prev,.next',function(){
                        las_idx = ul_bn.find('.on').index();
                             
                        if($(this).hasClass('prev')){
                            ban_idx = las_idx -1;
                            if(ban_idx<0)
                                ban_idx = li_.length-1;
                        }
                        else if($(this).hasClass('next')){
                            ban_idx = las_idx*1 +1;
                            if(ban_idx>=li_.length)
                                ban_idx = 0;
                        }
                        clearInterval(timer);

                        li_.eq(las_idx).stop().fadeOut().end().eq(ban_idx).stop().fadeIn();
                        bn_.eq(las_idx).removeClass('on').end().eq(ban_idx).addClass('on');
                    });

                    function banF(){
                        li_.eq(las_idx).stop().fadeOut().end().eq(ban_idx).stop().fadeIn();
                        bn_.eq(las_idx).removeClass('on').end().eq(ban_idx).addClass('on');
                        las_idx = ban_idx;
                        ban_idx ++;
                        if(ban_idx>=li_.length){
                            ban_idx = 0;
                            las_idx = li_.length-1;
                        }
                    }

            });

// -----------------------从数据库获取数据显示 懒加载-------------------------
            var pages = 0;
            var num = 6;
            var list_ul = $(".world_good .list"); 
            var page = last_page = 1;

            var ddd = new das({num:num,api:true,needSum:true}).init().getPage(function(arr,sum){
                // 计算页码
                pages = Math.ceil(sum/num);
                createList(arr);
                page++;  
                                                 
            });//new das
                 
            // 下拉加载更多
            $(window).on("scroll",function(){
                              
                // 快下拉到底部时 页码已 +1 且后面还有数据时
                if($(window).scrollTop()>=$(document).height()-1200&&last_page!==page){
                    console.log(page)
                         
                    if(page<=pages){  
                        ddd.page = page;
                        ddd.needSum = false;
                        ddd.getPage(function(arr){
                            createList(arr);
                            page++;                           
                        });
                        last_page = page;
                    }
                }
            });
                
// -----------------------------------生成列表--------------------------------
            function createList(arr){
                // 生成列表
                list_ul.append(arr.map(function(item){
                    var ov = 'stock_yes';
                    if(item.stock==0)   ov = 'over';
                    var cs = 'normal';
                    if(item.price-item.sale>0) cs = 'sub_lot';
                    var dp = item.det;
                    if(item.det==null) dp='';

                    return `<li><a href='html/details.html?idx=${item.id}' target='_blank'>
                                    <span class='icof icon-yiqiangguang ${ov}'></span>
                                    <img src='${item.img}'/>
                                    <p class='title'>${item.name}</p>
                                    <p class='dep'>${dp}</p>
                                    <p class='price_div'>
                                        <span class='sale'>${item.sale}</span>
                                        <span class='${cs}'>
                                        <i class='sub_ico'>直降</i>
                                        平日价<del>${item.price}</del></span>
                                        <span class='sale_num'><strong>${item.sale_num}人</strong>已购买</span>
                                    </p>
                                </a></li>`;
                }).join(""));

            }

            function createBanList(arr){
                ul_show.append(arr.map(function(item){
                    var str='';
                    if(item.you==1) str = '<span class="you_">包邮</span>';
                    var dp = item.det;
                    if(item.det==null) dp='';

                    return `<li>
                                <a href="html/details.html?idx=${item.id}" target='_blank'>
                                    <img src="${item.img}" alt="" />
                                    <div class="info">
                                        <h4>${item.name}</h4>
                                        <p class="des">${dp}</p>
                                        <p class="price_p">
                                            <span class="sale">${item.sale}</span>
                                            <span class="price_">
                                                <span class='icos'>
                                                    <span class="sub_">直降</span>${str}</span>
                                                平日价：<del>${item.price}</del>
                                            </span>
                                        </p>
                                    </div>
                                </a>
                            </li>`;
                }).join(""));
                ul_bn.append(arr.map(function(item,idx){
                    if(idx==0) 
                        return `<li class='on'><img src="${item.img}" alt="" /></li>`;
                    return `<li><img src="${item.img}" alt="" /></li>`;
                }).join(""));
            }

            
        });//jquery
    }); //require inner
});//require cofin