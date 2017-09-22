/* 
* @Author: Marte
* @Date:   2017-09-13 16:07:35
* @Last Modified by:   Marte
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
}