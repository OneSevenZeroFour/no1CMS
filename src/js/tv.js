/* 
* @Author: Marte
* @Date:   2017-09-01 14:07:53
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 13:23:28
*/

require(['config'],function(){
    require(['headjs','sear','fix','jq'],function(hea,sse,fixjs){
        $(document).ready(function(){
            $("#fixx").load("fix.html",function(){
                fixjs.fixF();
            });
            $("#header").load("header.html",function(){
                hea.hea();
            });
            $("#search").load("search.html",function(){
                sse.sear();
            });
            $("#nav").load("nav.html",function(){
                $("#nav ul>li").eq(1).addClass('on').find("a").attr("href","#");
            });
            $("#footer").load("footer.html");
        });
    });
})

