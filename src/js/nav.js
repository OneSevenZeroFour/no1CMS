/* 
* @Author: Marte
* @Date:   2017-09-01 17:00:07
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-01 19:15:26
*/

var all_st = $("#all_sort");
var all_st_lis = $(".all_aort_ul");

all_st_lis.hide();

all_st_lis.find('.all_oneli .allsort_li_one').css("background-position",function(){
    var left = -($(this).parent().index()*25+210);         
    return left+'px 0';
});
    
all_st.on("mouseenter",function(){
    $(this).find(".icof").eq(1).removeClass('icon-down').addClass('icon-up');
    all_st_lis.show();
}).on("mouseleave",function(){
    setTimeout(function(){
        all_st.find(".icof").eq(1).removeClass('icon-up').addClass('icon-down');
        all_st_lis.hide();
    },300);
});
