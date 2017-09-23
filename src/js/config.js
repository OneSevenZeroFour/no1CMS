/* 
* @Author: Marte
* @Date:   2017-09-01 10:22:31
* @Last Modified by:   Marte
<<<<<<< HEAD
* @Last Modified time: 2017-09-11 13:11:52
=======
* @Last Modified time: 2017-09-20 20:59:16
>>>>>>> be76d84a936013851c42337d43e79d421354c563
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
<<<<<<< HEAD
        fly:'../js/fly'
=======
        fly:'../js/fly',
        socket:'../lib/socket'
>>>>>>> be76d84a936013851c42337d43e79d421354c563
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