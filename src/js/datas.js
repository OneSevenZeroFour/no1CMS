/* 
* @Author: Marte
* @Date:   2017-07-30 17:59:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-09 15:50:54
*/

  function das(obj){
  // das:function(){
    var def = {
      num=6,
      page=1,
      api=false,
      sortIs=false,
      orderBy='id',
      sortWay='ASC',
      needSum=false
    } = obj;
   
    this.num = num;
    this.page = page;
    this.api = api;
    this.sortIs = sortIs;
    this.orderBy = orderBy;
    this.sortWay = sortWay;
    this.needSum = needSum;
  }
  das.prototype.init = function(){
    return this;
  }
  // 获取单个商品
  das.prototype.getOne = function(idx,fn){
    var url = "../api/get_a_good.php";
    if(this.api) url = "./api/get_a_good.php";
    $.ajax({
      url: url,
      data:{idx:idx},
      success:function(data){
        if(data=='null')
          fn(data);
        else fn($.parseJSON(data));
      }
    });
    return this;
  }
  // 获取部分商品
  das.prototype.getPage = function(fn){
      var url = "../api/get_goods.php";
      if(this.api) url = "./api/get_goods.php";
      var datas = {n:this.num,p:this.page,s:this.orderBy,x:this.sortWay,ns:this.needSum}
      if(this.sortIs) datas.t = this.sortIs;
      $.ajax({
        url: url,
        data: datas,
        success:function(data){
          var arr = data;
          var arr = $.parseJSON(($.parseJSON(data).data));
          if(needSum){
            var sum = $.parseJSON(data).sum;
            fn?fn(arr,sum):'';
          }else{
            fn?fn(arr):'';
          }
          
        }
      });
      return this;
  }
