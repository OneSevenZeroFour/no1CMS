/* 
* @Author: Marte
* @Date:   2017-09-13 17:29:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-25 11:49:00
*/
require(['./add-good','./admin-index','../../js/cookie'],function(editor,up){
    var idx = location.search.slice(1).split('=')[1];
    up.upF();
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

    var imgsss = $(".edit_imgs");
    var cc = new Cookie({name:"user"}).init();   

    $.ajax({
        url: 'http://localhost:10086/enterAddGood',
        dataType: 'json',
        data:{id:cc.get()}
    }).done(function() {
       console.log("success");
    });  


    $.ajax({
        url: 'http://localhost:10086/select_one',
        type: 'POST',
        data: {id: idx},
        success:function(data){
            var obj = JSON.parse(data)[0];
            console.log(obj)
                 
            name_p.val(obj.name); 
            var arr = obj.imgs.split(';');
            if(arr[arr.length-1]=='') arr.pop();
            imgsss.html(arr.map(function(item){
                return `<div>
                <img src='../${item}' />
                <a href='javascript:;'>&times;</a>
                </div>`;
            }).join(""));

            brand_p.val(obj.brand);
            href_p.val(obj.href);
            price_p.val(obj.price);
            sale_p.val(obj.sale);

            var tag = obj.tag.replace(/\d/g,'');  
            var tag1 = '';               
            for(var i=0;i<tag.length;i++)
                if(tag[i].toLowerCase()>'e'){
                    tags_.val(tag[i]);  
                    tags_p.find('.'+tag[i]).show();  
                    tag1 = tag[i];
                    break;                     
                }  
            tag = obj.tag.replace(/[a-z]/ig,'');
            if(tag1!=='')
                for(var i=0;i<tag.length;i++){
                    if(tag[i]==0) continue;
                    tags_p.find('.'+tag1+' li').eq(i-1).addClass('on');
                }  
            if(tag.indexOf(0)>-1) tv_p.val(0);   

            det_p.val(obj.det);
            stock_p.val(obj.stock);
            seller_p.val(obj.seller);
            // 自己挖的坑 跪着也要填完
            var deli = '';
            if(obj.deli!=null)
                deli = obj.deli.slice(5,-3);     
            deli_p.val(deli);
            var sub = '';
            if(obj.sub!=null)
                sub = obj.sub.slice(8,-1);                 
            sub_p.val(sub);

            editor.txt.html(obj.de_imgs);

            free_p.val(obj.free);
            param_p.val(obj.param);
            list_p.val(obj.list);

        }
    });

    tags_.on('change',function(){        
        tags_p.find('ul').hide().end().find('.'+$(this).val()).show();
    });

    tags_p.on('click','.tag',function(){
        $(this).toggleClass('on');
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

    imgsss.on('click','a',function(e){
        $(this).closest('div').fadeOut('fast',function() {
            $(this).remove();
        });
    });

    $("#edit_bn").on('click',function(e){
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
        imgsss = imgsss.find('div img');
        console.log(imgsss)
        
        var img = str = '';
        if(imgsss.length>0) 
            img = str = imgsss.eq(0).attr('src').replace('../','');               
              
            
        if(imgsss.length>1)
            for(var i=1;i<imgsss.length;i++)
                str += ';' + imgsss.eq(i).attr('src').replace("../",'');
            
        editor.didSaveImgs(cc.get(),function(){
            var obj = {
                        id:idx,
                        name:name,
                        img:img,
                        imgs:str,
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
                        de_imgs:editor.txt.html()
                        // time:time
                    }  

                    $.ajax({
                        url: 'http://localhost:10086/update',
                        type: 'POST',
                        data: {obj:obj},
                        success:function(data){
                            history.go(-1);
                        }
                    });
            
        });                  
        
        // var time = new Date();
        // time = time.getFullYear()+'-'+time.getMonth()+"-"+time.getDate()+" "+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
 
    });
   
});
