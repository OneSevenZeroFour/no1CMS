/* 
* @Author: Marte
* @Date:   2017-09-13 16:07:35
* @Last Modified by:   Marte
<<<<<<< HEAD
* @Last Modified time: 2017-09-23 09:14:11
*/

var list = $("#list");
var gs = $("#goods_sum");
var page = 1,num = 6;
var ul = $('.am-pagination');
var pages = 0;
var prev = next = null;
var first = true;
var sor = $('#sort_sel');

ul.on('click','li',function(){
    pages = Math.ceil(gs.html()/num);
    
    if($(this).hasClass('next')){
      if(page>=pages) return false;

      page += 1;
      ul.find('.am-active').next().addClass('am-active').siblings('li').removeClass('am-active');
      createList(page,num);
    }

    else if($(this).hasClass('prev')){
      if(page<=1) return false;
      
      page -= 1;
      ul.find('.am-active').prev().addClass('am-active').siblings('li').removeClass('am-active');
      createList(page,num);
    }

    else{
      $(this).addClass('am-active').siblings('li').removeClass('am-active');
        
      page = $(this).find('a').html();
      createList(page,num);
      
    }
         
    if(page>=pages) next.addClass('am-disabled');
    else next.removeClass('am-disabled');
         
    if(page<=1) prev.addClass('am-disabled'); 
    else prev.removeClass('am-disabled');
});

createList(page,num);
sor.on('change',function(){
  first = true;
  createList(page,num);
});
//查
function createList(p,n){
  var obj = {page:p,num:n}
  if(sor.val().toUpperCase()!="A")
    obj.tag = sor.val().toUpperCase();
  $.ajax({
      url: 'http://localhost:10086/select',
      type: 'POST',
      data: obj,
      success:function(data){
          var arr = JSON.parse(JSON.parse(data).data);
          var sum = JSON.parse(data).sum
          gs.html(sum);  
          if(first){
            createPage(Math.ceil(sum/num));
            first = false;   
          }     
          list.html(arr.map(function(item){
              var time = item.time.slice(0,10);
              var det = item.det;
              if(det=='null'||det==null) det = '';
              return `<tr good='${item.id}'>
                          <td class='table_cb'><input type="checkbox" /></td>
                          <td class='table_img'><img src="../${item.img}" /></td>
                          <td class='table_name'><a href="#">${item.name}</a></td>
                          <td class='table_price'>￥${item.price}</td>
                          <td class='table_sale'>￥${item.sale}</td>
                          <td class='table_det'>${det}</td>
                          <td class='table_time'>${time}</td>
                          <td class='table_do'>
                            <div class="am-btn-toolbar">
                              <div class="am-btn-group am-btn-group-xs">
                                <button class="am-btn am-btn-default am-btn-xs am-text-secondary">
                                  <span class="am-icon-pencil-square-o"></span> 编辑
                                </button>
                                <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</button>
                              </div>
                            </div>
                          </td>
                    </tr> `
          }).join(""));
          clickEdit();      
      }
  });
}

function clickEdit(){

  $(".am-text-danger").on('click',function(){   
      var n = confirm('确定删除吗？');  
      if(n){
        var id = $(this).closest('tr').attr('good');
        $.ajax({
              url: 'http://localhost:10086/delete',
              type: 'POST',
              data: {idx: id},
              success:function(data){
                console.log(data); 
                page = ul.find(".am-active a").html();
                createList(page,num); 
                first = true;             
              }
          });   
      }
      
  });//delect-onclick

  $('.am-text-secondary').on('click',function(e){
      e.preventDefault();
      var id = $(this).closest('tr').attr('good');
      location.href = 'admin-edit-good.html?idx='+id;       
      return false;          
  });  

}

function add(){
    location.href = 'admin-add-good.html';
}

function createPage(pages){
  var str = '<li class="prev am-disabled"><a href="#">«</a></li><li class="am-active"><a href="#">1</a></li>';
  for(var i=2;i<=pages;i++){
      str += '<li><a href="#">'+i+'</a></li>';
  }

  ul.html(str+'<li class="next"><a href="#">»</a></li>');
  prev = ul.find('.prev');
  next = ul.find('.next');
=======
* @Last Modified time: 2017-09-21 09:03:29
*/

//查
$.ajax({
    url: 'http:localhost:3000/select',
    type: 'POST',
    success:function(data){
        var arr = JSON.parse(JSON.parse(data).data);
        $("#goods_sum").html(JSON.parse(data).sum);
             
        $("#list").html(arr.map(function(item){
            var time = item.time.slice(0,10);
            var det = item.det;
            if(det=='null'||det==null) det = '';
            return `<tr good='${item.id}'>
                        <td class='table_cb'><input type="checkbox" /></td>
                        <td class='table_img'><img src="../${item.img}" /></td>
                        <td class='table_name'><a href="#">${item.name}</a></td>
                        <td class='table_price'>￥${item.price}</td>
                        <td class='table_sale'>￥${item.sale}</td>
                        <td class='table_time'>${time}</td>
                        <td class='table_det'>${det}</td>
                        <td class='table_do'>
                          <div class="am-btn-toolbar">
                            <div class="am-btn-group am-btn-group-xs">
                              <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</button>
                              <button class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span class="am-icon-copy"></span> 复制</button>
                              <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</button>
                            </div>
                          </div>
                        </td>
                  </tr> `
        }).join(""));
        
        $(".am-text-danger").on('click',function(){         
            var id = $(this).closest('tr').find("td").eq(1).html();
            $.ajax({
                  url: 'http://localhost:3000/delete',
                  type: 'POST',
                  data: {idx: id},
                  success:function(data){
                    console.log(data);                         
                  }
              });   
        });//delect-onclick
        
        $('.am-text-secondary').on('click',function(e){
            e.preventDefault();
               
            var id = $(this).closest('tr').attr('good');
            console.log(id)
                 
            location.href = 'admin-edit-good.html?idx='+id;       
            return false;          
        });         
    }
});

function add(){
    location.href = 'admin-add-good.html';
>>>>>>> lzh
}