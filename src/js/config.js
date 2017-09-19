/* 
* @Author: Marte
* @Date:   2017-09-01 10:22:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 13:11:52
*/

require.config({
    urlArgs:'v='+Date.now(),
    paths:{
        jq:'../lib/jquery-3.2.1.min',
        headjs:'../js/header',
        fix:'../js/fixx',
        sear:'../js/search',
        da:'../js/datas',
        user:'../js/userdata',
        cookie:'../js/cookie',
        fly:'../js/fly'
    },shim:{
            "headjs": {
                deps: ["jq"],
                exports:'headjs'
            },
            "sear": {
                deps: ["jq"],
                exports:'sear'
            },
            "da": {
                deps: ["jq"],
                exports:'da'
            },
            "user": {
                deps: ["jq"],
                exports:'user'
            },
            "cookie": {
                deps: ["jq"],
                exports:'cookie'
            },
            "fly": {
                deps: ["jq"],
                exports:'fly'
            }
        }
});