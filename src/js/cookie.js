/* 
* @Author: Marte
* @Date:   2017-09-05 09:04:11
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 10:43:21
*/

function Cookie(obj){
    var def = {
        name=false,
        data=false,
        exp=false,
        path='/'
    }=obj;
    this.name = name;
    this.data = data;
    this.exp = exp;
    this.path = path;
}

Cookie.prototype.init = function(){
    return this;
}
Cookie.prototype.set = function(){
    if(!this.name) return this;

    var str = this.name + "=" + this.data;
    if(this.exp)    str += ';expires=' + this.exp;
    if(this.path!='')   str += ';path=' + this.path;
    document.cookie = str;
         
    return this;
}
Cookie.prototype.get = function(){
    var c = document.cookie;
    if(c.length === 0) return false;//没有cookie
    var c_arr = c.split('; ');
    for(var i=0;i<c_arr.length;i++){
        var arr = c_arr[i].split('=');
        if(arr[0] === this.name){
            return arr[1];
        }
    }
    return false;//没有该条cookie
}
Cookie.prototype.del = function(){
    var day = new Date();
    day.setDate(day.getDate()-7);
    this.exp = day.toUTCString();
    this.data = "xxx";
    this.set();
}
