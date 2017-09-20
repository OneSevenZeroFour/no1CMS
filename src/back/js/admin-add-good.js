/* 
* @Author: Marte
* @Date:   2017-09-20 15:52:34
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 20:03:59
*/
var name_p = $('.add_name'),name = '';
var brand_p = $('.add_brand'),brand = '其他';
var href_p = $('.add_href'),href = '';
var price_p = $('.add_price'),price=0;
var sale_p = $('.add_sale'),sale=0;

var tags_p = $('.tag_p'),tags='0';
var det_p = $('.add_det'),det='';
var stock_p = $('.add_stock'),stock=1;
var seller_p = $('#add_seller'),seller=0;
var you_p = $('#add_you'),you=0;//有无包邮
var deli_p = $('.add_you_pay'),deli='订单金额满168元包邮';//多少包邮

var free_p = $('.add_free'),free = '';
var sub_p = $('.add_sub'),sub='';

var param_p = $(".add_param"),param='';
var list_p = $('.add_list'),list='';

var E = window.wangEditor;
var editor2 = new E('#add_intro');

editor2.create();

$("#add_bn").on('click',function(e){
    e.preventDefault();
    name = name_p.val().trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
    brand = brand_p.val().trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
    href = href_p.val().trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
    price = price_p.val();
    sale = sale_p.val();
    tags = tags_p.find('.on');

    if(name==''){
        return false;
    }
    // list.val(param.val())
    // console.log(seller.val())
    // alert(det.val());
})
