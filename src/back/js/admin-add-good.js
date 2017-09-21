/* 
* @Author: Marte
* @Date:   2017-09-20 15:52:34
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-21 17:36:42
*/

require(['./add-good','./admin-index'],function(wang,up){
    wang.init();         
    up.upload();
    var name_p = $('.add_name'),name = '';
    var brand_p = $('.add_brand'),brand = '其他';
    var href_p = $('.add_href'),href = '';
    var price_p = $('.add_price'),price=0;
    var sale_p = $('.add_sale'),sale=0;

    var tags_ = $("#add_tag");
    var tags_p = $('.tag_p'),tags=tags_.val();
    var tv_p = $("#add_tv"),tv=0;
    var det_p = $('.add_det'),det='';
    var stock_p = $('.add_stock'),stock=1;
    var seller_p = $('#add_seller'),seller=0;
    var you = 0;
    var deli_p = $('.add_you_pay'),deli=null;//多少包邮

    var free_p = $('.add_free'),free = null;
    var sub_p = $('.add_sub'),sub=null;

    var param_p = $(".add_param"),param=null;
    var list_p = $('.add_list'),list=null;

    tags_p.find('ul').first().show();
    tags_.on('change',function(){        
        tags_p.find('ul').hide().end().find('.'+$(this).val()).show();
    });
         
    // 最低金额限制
    $('.money').on('change',function(){
        if($(this).val().indexOf('-')>-1)
            $(this).val(1);
        if($(this).val()<$(this).attr('min'))
            $(this).val($(this).attr('min'));
    });
    //库存不能有小数点
    stock_p.on('change',function(){
        if($(this).val().indexOf('.')>-1)
            $(this).val($(this).val().split('.')[0]);
    });

    tags_p.on('click','.tag',function(){
        $(this).toggleClass('on');
    });

    $("#add_bn").on('click',function(e){
        e.preventDefault();
        
        name = name_p.val().trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
        brand = brand_p.val().trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
        href = href_p.val().trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
        price = price_p.val();
        sale = sale_p.val();
        tags = tags_.val()+tv_p.val(); 
             
        var arr = tags_p.find('.'+tags+' .on');
        if(arr)
            for(var i=0;i<arr.length;i++){
                tags += arr.eq(i).index()*1+1;
            }
        det = det_p.val();
        stock = stock_p.val();
        seller = seller_p.val();
        if(deli_p.val()!=''){
            you = 1;
            deli = "订单金额满"+deli_p.val()+"元包邮";
        }
        if(free_p.val().trim()!='')
            free = free_p.val();
        if(sub_p.val()!='')
            sub = 'TV商品下单立减'+sub_p.val()+'元'

        if(param_p.val().trim()!='')
            param = param_p.val().replace(/</g,'&lt;').replace(/>/g,'&gt;');
        if(list_p.val().trim()!='')
            list = list_p.val().replace(/</g,'&lt;').replace(/>/g,'&gt;');
        
        if(name==''||sale==''||tags==''||stock==''){
            alert('请确保标题、现价、分类、库存不为空。');
            return false;
        }

        var time = new Date();
        time = time.getFullYear()+'-'+time.getMonth()+"-"+time.getDate()+" "+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();

        var obj = {
            name:name,
            brand:brand,
            href:href,
            price:price==''?sale:price,
            sale:sale,
            tag:tags,
            det:det,
            stock:stock,
            seller:seller,
            you:you,
            deli:deli,
            free:free,
            sub:sub,
            param:param,
            list:list,
            time:time
        }  
             
        // $.ajax({
        //          url: 'http://localhost:3000/insert',
        //          type: 'POST',
        //          data: {obj: obj},
        //          success:function(){
        //             console.log('insert success');                         
        //          }
        //      });
                                  

    });
});