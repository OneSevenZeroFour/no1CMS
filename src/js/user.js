/* 
* @Author: Marte
* @Date:   2017-09-05 10:44:09
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 13:27:41
*/

require(['config'],function(){
    require(['jq','headjs','fix','user'],function(jQ,hea,fixjs){

       $("#fixx").load("fix.html",function(){
            fixjs.fixF();
       });
       $("#header").load("header.html",function(){
           hea.hea();
       });
       $("#footer").load("footer.html");

    });
});