/* 
* @Author: Marte
* @Date:   2017-07-30 17:59:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 17:09:26
*/

// define(["jquery"],function(){
  // return{
    function userdas(obj){
    // userdas:function(){
      var def = {
        id='',
        psd="",
        vip=0,
        tv=0,
        car='',
        cn=0,
        api=false
      } = obj;
     
      this.id = id;
      this.psd = psd;
      this.vip = vip;
      this.tv = tv;
      this.car = car,
      this.cn = cn;
      this.api = api;
    }
    userdas.prototype.init = function(){
      return this;
    }
    // 查看用户是否存在
    userdas.prototype.search = function(fn){
      $.ajax({
        url: "../api/reg_search.php",
        data:{id:this.id},
        success:function(data){
          fn(data);        
        }
      });
      return this;
    }
    userdas.prototype.isVip = function(){
      $.ajax({
        url:"../api/reg_vip.php",
        data:{id:this.id},
        success:function(data){
          return data;
        }
      })
    }
    userdas.prototype.isTv = function(){
      $.ajax({
        url:"../api/reg_tv.php",
        data:{id:this.id},
        success:function(data){
          return data;
        }
      })
    }
    userdas.prototype.insert = function(fn){
      $.ajax({
        url: "../api/reg_insert.php",
        data:{id:this.id,psd:this.psd},
        type:'POST',
        success:function(data){
          fn(data);        
        }
      });
      return this;
    }
    userdas.prototype.check = function(fn){
      $.ajax({
        url: "../api/login.php",
        data:{id:this.id,psd:this.psd},
        type:'POST',
        success:function(data){
          fn(data);        
        }
      });
      return this;
    }
    userdas.prototype.car_set = function(){
      // 存入购物车信息
      var api = "../api/write_car.php";
      if(this.api) api = "./api/write_car.php";
      $.ajax({
        url: api,
        data:{id:this.id,car:this.car,cn:this.cn},
        type:'POST',
      });
      return this;
    }

    userdas.prototype.car_get = function(fn){
      var api = "../api/get_car.php";
      if(this.api) api = "./api/get_car.php";
      $.ajax({
        url: api,
        data:{id:this.id},
        success:function(data){
          if(data=='')
            fn(data);
          else fn($.parseJSON(data));
        }
      });
      return this;
    }
  // }
// });


