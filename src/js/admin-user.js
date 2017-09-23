/**
 * by:lfp
 * time:2017年9月21日09:23:43
 */
require.config({
	urlArgs:'v='+Date.now(),
	paths:{
		jq:"../assets/js/jquery.min",
		amazeui:"../assets/js/amazeui.min",
		app:"../assets/js/app",
	},
	shim:{
		amazeui:['jq'],
		app:['jq']
	}
});
require(["jq","amazeui","app"],function(){

  //根据cookie中 的用户名来 请求不同商家信息
  var CookieMethd = {
	    //设置cookie
	    set:function(name,val,expires,path,domian){
	      var cookieStr = name + '='+val;
	      //是否设置了有效期参数
	      if(expires){
	        cookieStr +=';expires='+expires.toUTCString();
	      }
	      //是否设置了路径参数
	      if(path){
	        cookieStr +=';path='+path;
	      }
	      //是否设置了域名参数
	      if(domian){
	        cookieStr +=';domian='+domian;
	      } 
	      //写入cookie
	      document.cookie = cookieStr;  
	    },
	    //获取cookie
	    get:function(name){
	      //获取全部cookie
	      var cookies = document.cookie;
	      if(cookies.length === 0){
	        return "";
	      }
	      //如果cookie没有数据 就返回空字符串
	      //如果有 则拆分
	      cookies = cookies.split('; ');
	      //用于接收cookie字符串 并被返回
	      var res = '';
	      cookies.forEach(function(item){
	        var arr = item.split("=");
	        if(arr[0] === name){
	          res = arr[1];
	        }
	      })
	      return res;
	    },
	    //删除cookie
	    remove:function(name){
	      var nowTime = new Date();
	        nowTime.setDate(nowTime.getDate()-99);
	        // console.log(nowTime.toUTCString());
	      // document.cookie = name+'=null;expires='+nowTime.toUTCString()+';path=/';
	      // path 路径问题导致无法删除cookie
	      console.log('测试：'+document.cookie)
	      CookieMethd.set(name,null,nowTime);
	    }
  }  

  var ckUserName = CookieMethd.get("username");
  console.log(ckUserName)
  var business = $(".business");
  if(ckUserName){
      //如果对应cookie中的商家id存在 则请求 其对应资料
      $.ajax({
        url:"http://localhost:10086/businessmen",
        type:"get",
        data:{
          userID:ckUserName
        },
        success:function(data){
          var res = data
          try{
            res = JSON.parse(data)
          }catch(err){
            console.log(err)
          }
           console.log(res.results[0])
           $(".am-img-thumbnail").attr("src",`${res.results[0].imgurl}`);
           business.html(`
                <ul>
                  <li><p><span>商家名：</span>${res.results[0].names}</p></li>
                  <li><p><span>简介：</span>${res.results[0].intro}</p></li>
                  <li><p><span>微博：</span>${res.results[0].weibo}</p></li>
                  <li><p><span>企业QQ：</span>${res.results[0].qq}</p></li>
                  <li><p><span>企业电话：</span>${res.results[0].phone}</p></li>
                  <li><p><span>企业邮箱：</span>${res.results[0].email}</p></li>
                </ul>
            `)
        }
      })
  }
});