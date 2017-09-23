/* 
* @Author: Marte
* @Date:   2017-09-08 15:45:03
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 17:40:12
*/

require(['config'],function(){
    require(['headjs','sear','fix','jq'],function(hea,sse,fixjs){
        $(document).ready(function(){
            $("#fixx").load("fix.html",function(){
                fixjs.fixF();
                fixjs.custom();
            });
            $("#header").load("header.html",function(){
                hea.hea();
            });
            $("#search").load("search.html",function(){
                sse.sear();
            });
            $("#nav").load("nav.html",function(){
                $("#nav ul>li").eq(0).addClass('on');
            });
            $("#footer").load("footer.html");

// ---------------------------menu 精灵图 ----------------------------
            var me_li = $(".eat_menu li span");
            var me_li_a = me_li.closest('a');

            for(var i=1;i<me_li.length;i++){
                me_li.eq(i).css("background-position",(1-i)*80+'px -120px');
            }
            var homee = $(".eat_menu .all");
            if(homee.hasClass('on')){
                homee.find('span').css("background-position","0 -60px");
            }

            me_li_a.on("mousemove",function(){
                if($(this).parent().hasClass('on'))
                    return false;
                var spa = $(this).find('span');
                spa.css("background-positionY",-180);
                if($(this).parent().hasClass('all')){
                    spa.css("background-positionY",-60);
                }
            }).on("mouseleave",function(){
                if($(this).parent().hasClass('on'))
                    return false;
                var spa = $(this).find('span');
                spa.css("background-positionY",-120);
                if($(this).parent().hasClass('all')){
                    spa.css("background-positionY",0);
                }
            });
// ----------------------------生成列表 懒加载-------------------------------
            var ul = $(".list");
            var pages = 0;
            var num = 6;
            var page = last_page = 1;

            var ddd = new das({num:num,needSum:true,orderBy:'time',sortIs:'tag like "%G%"'}).init().getPage(function(arr,sum){
                // 计算页码
                pages = Math.ceil(sum/num);
                createList(arr);
                page++;                
            });//new das
                 
            // 下拉加载更多
            $(window).on("scroll",function(){
                console.log(page,pages)
                     
                // 快下拉到底部时 页码已 +1 且后面还有数据时
                if($(window).scrollTop()>=$(document).height()-1200&&last_page!==page){
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
            // 鼠标悬停动画
            ul.on("mousemove",'li',function(){
                $(this).find(".comm_p").slideDown('slow');
            }).on("mouseleave",'li',function(){
                $(this).find(".comm_p").hide();                                                               
            });
// ------------------------------按时间/价格排序-------------------------------
            var pr = $("#price");
            var ti = $("#time");
            var xl = $("#sales");
            var time_flag = sale_flag = false;
            var pri_flag = true;

            pr.on("click",function(){
                ul.empty();
                     
                pr.siblings('span').removeClass('on');
                if(!(pr.hasClass('on')))
                    pr.addClass('on');
                ddd.orderBy = 'sale';
                ddd.sortWay = pri_flag?'ASC':'DESC';
                ddd.needSum = true;
                ddd.page = page = 1;//记得重置页码
                ddd.getPage(function(arr,sum){
                    pages = Math.ceil(sum/num);
                    createList(arr);
                });
                // 取反flag控制正反序
                pri_flag = !pri_flag;
            });
            ti.on("click",function(){
                ul.empty();
                     
                ti.siblings('span').removeClass('on');
                if(!(ti.hasClass('on')))
                    ti.addClass('on');
                ddd.orderBy = 'time';
                ddd.sortWay = time_flag?'ASC':'DESC';
                ddd.needSum = true;
                ddd.page = page = 1;
                ddd.getPage(function(arr,sum){
                    pages = Math.ceil(sum/num);
                    createList(arr);
                });
                time_flag = !time_flag;
            });
            xl.on("click",function(){
                ul.empty();
                     
                xl.siblings('span').removeClass('on');
                if(!(xl.hasClass('on')))
                    xl.addClass('on');
                ddd.orderBy = 'sale_num';
                ddd.sortWay = sale_flag?'ASC':'DESC';
                ddd.needSum = true;
                ddd.page = page = 1;
                ddd.getPage(function(arr,sum){
                    pages = Math.ceil(sum/num);
                    createList(arr);
                });
                sale_flag = !sale_flag;
            });

 // -----------------------------------生成列表--------------------------------
             function createList(arr){
                 // 生成列表
                 ul.append(arr.map(function(item){                                
                     var ov = 'stock_yes';
                     if(item.stock<=0)   ov = 'over';
                     var cs = 'normal';
                     if(item.price-item.sale>0) cs = 'sub_lot';
                     var dp = item.det;
                     if(item.det==null) dp='';
                     
                          
                     var span_str = '';
                     var tv_ico = '';
                     if(item.seller==0){
                        span_str += "<span class='tv lab'>TV商品</span>";
                        tv_ico = '<span class="tv_ico"></span>';                        
                     }
                     else if(item.seller==1)
                        span_str += "<span class='ugo lab'>官网专供</span>";
                     else if(item.seller==2)
                        span_str += "<span class='sel lab'>商家直营</span>";
                     if(item.you==1)
                        span_str += "<span class='deli lab'>免运费</span>";

                     return `<li>${tv_ico}
                            <a href="details.html?idx=${item.id}" target='_blank'>
                                <img src="../${item.img}" alt="" /></a>
                            <p class="title">
                                <a href="details.html?idx=${item.id}" target='_blank'>
                                ${item.name}</a>
                            </p>
                            <p class="info">
                                <span class="sale">${item.sale}</span>
                                <span class="com_span">
                                    评论<a href='"details.html?idx=${item.id}' target='_blank' class="comm">${item.comments}</a>条
                                </span>
                            </p>
                            <p class="label">
                                <span class='label_left'>
                                    ${span_str};
                                </span>
                                <span class='label_right'>
                                    <span class='score lab'>积</span>${item.sale}
                                </span>
                            </p>
                            <div class='comm_p'>
                                <h4>会员评价：</h4>
                                <p>
                                <span>&ldquo;</span>并没有评论的数据，所以这里是...<span>&rdquo;</span>
                                </p>
                            </div>
                        </li>`;
                 }).join(""));
                 
             }               
        });
    });
})
