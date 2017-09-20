var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var writeStream = fs.createWriteStream('imgs.txt');
// var titleWriteStream = fs.createWriteStream('')

var promise_arr = [];
var craw_arr = [];
var p = [];
for(var j = 0; j < 4; j++){
    p.push(j+1);
}
/*使用promise数组，存放请求*/
promise_arr = p.map(function(item,idx){
    var promise = new Promise(function(resolve,reject){
        request.get(`http://www.ugoshop.com/ch92/sort8-page${idx+1}.html#good_list`,function(error, response, body){
            if (error) {
                console.log(error);
                reject();
            }
            const $ = cheerio.load(body);
            var goods = $('#goodslist_div').children('.pruwrap');
            // var goodsImg = goods.find('.goodsphoto').find('img');
            // var goodsTitle = goods.find('.goods-tittle').find('a');
            goods.each(function(index, ele) {
                var goodImg = $(ele).find('.goodsphoto').find('img').attr('src');

                var detailUrl = 'http://www.ugoshop.com/'+$(ele).find('.goodsphoto').find('a').attr('href');
               /* request.get(detailUrl,function(err,res,bd){
                    const $ = cheerio.load(bd);
                    brands = $('.country-brand').find('a').html();
                    var
                })
*/
                var title = $(ele).find('.goods-tittle').find('a').html();

                var price = $(ele).find('.goods-picmass').find('.now-price').text().trim().replace('￥','');
                var review = $(ele).find('.goods-picmass').find('.review').find('a').html();
                     
                var obj = {
                    "goodImg":goodImg,
                    "goodTitle":title,
                    "goodPrice":price,
                    "review":review
                };
                     
                craw_arr.push(JSON.stringify(obj));
            });    
            resolve(`page ${idx+1} 数据获取完成`);
        });
    })
    return promise;
});
/*当所有数据获取完后，写入文件*/
Promise.all(promise_arr).then(function(data){
    console.log('网站数据获取完成');

    writeStream.write('['+craw_arr.join(',')+']','UTF8');
    writeStream.end();
}).catch(function(reason){
    console.log(reason)
         
})

writeStream.on('finish',function(){
    console.log('写入完成');
});
writeStream.on('error',function(err){
    console.log(err);
});




/*{

    id,
    imgs,//
    seller,
    brand,
    href,
    comments,//
    param,
    list,
    sub,
    deli
}*/