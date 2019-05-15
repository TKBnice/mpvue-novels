var express = require('express');
var router = express.Router();
var http = require('https');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var vm = require('vm');
var iconv = require('iconv-lite');
var querystring = require('querystring');
var zlib = require('zlib');

var utils = require('../utils');

// var Parser51ZWX = require('../parser/2');
//设置允许跨域访问该服务.

import ParserPPKOO from '../parser/PPKOO';

/* GET home page. */
router.get('/index', function(req, res, next) {
    res.render('index', { title: '简单nodejs爬虫' });
});

router.get('/getList', function(req, res, next) {
    res.send({ list: '简单nodejs爬虫' });
});

router.get('/getSelectGoodsList', function(req, res, next) {
    var data = fs.readFileSync('./json/test.json').toString('utf-8');
    // 写入成功后读取测试
    // console.log('data',typeof JSON.parse(data));

    res.send(JSON.parse(data));
});

router.get('/listShopGoodsInfo.do1', function(req, res, next) {
    var data = fs.readFileSync('./json/listShopGoodsInfo1.json').toString('utf-8');
    // 写入成功后读取测试
    // console.log('data',typeof JSON.parse(data));
    res.send(JSON.parse(data));
});

router.get('/listShopGoodsInfo.do2', function(req, res, next) {
    var data = fs.readFileSync('./json/listShopGoodsInfo2.json').toString('utf-8');
    // 写入成功后读取测试
    // console.log('data',typeof JSON.parse(data));
    res.send(JSON.parse(data));
});

router.get('/PPKOO/index', function(req, res, next) { // 浏览器端发来get请求

    var Res = res;  //保存，防止下边的修改
    //url 获取信息的页面部分地址
    var url = 'https://www.ppkoo.com/search/goods.html';

    // https://www.ppkoo.com/search/goods.html?keywords=%E5%9B%9B%E4%BB%B6%E5%A5%97
    // https://www.ppkoo.com/search/goods.html?keywords=%E5%9B%9B%E4%BB%B6%E5%A5%97&page=2
    utils.httpGet(http,url).then((data)=>{
        var $ = cheerio.load(data); //cheerio模块开始处理 DOM处理
        var parser = new ParserPPKOO($);
        Res.render('PPKOO', parser.data);
    })
});

router.get('/SetLoginStatus', function(req, res, next) { // 浏览器端发来get请求

  var Res = res;  //保存，防止下边的修改




    Res.send({
        data,
        success:true
    });


});



router.get('/getGoodsList', function(req, res){
    var Res = res;  //保存，防止下边的修改
    var page = req.query.page;
    var keywords = req.query.keywords;
    var url = 'https://www.ppkoo.com/search/goods.html';

    if (page&&page!=''&&keywords&&keywords!='') {
        url = url+'?page='+page+'&keywords='+encodeURIComponent(keywords);
    }
    else if (page&&page!='') {
        url = url+'?page='+page;
    }
    else if (keywords&&keywords!='') {
        url = url+'?keywords='+encodeURIComponent(keywords);
    }

    console.log('query',req.query);
    console.log('url',url);

    utils.httpGet(http,url).then((htmlString)=>{

        try {
            var sharedSandbox = {
                CLog       :console,
                htmlString : htmlString,
                cheerio    : cheerio,
                iconv      : iconv,
                Date       : new Date(),
                parserInfo : {},                              ///parser内部信息
                result     : {},                                  ///返回结果
                vm         :vm
              };

            var parserCode = fs.readFileSync('./parser/parser_ppkoo.js');

            vm.runInNewContext(parserCode, sharedSandbox);
            // var $ = cheerio.load(data); //cheerio模块开始处理 DOM处理
            // var parser = new ParserPPKOO($);
            // console.log('sharedSandbox',sharedSandbox.result);
            //   console.log('__dirname',path.resolve('./parser/parser_ppkoo.js'));

            Res.send({
                data:sharedSandbox.result,
                success:true
            });

        } catch (error) {

            console.log('parser error:',error);

        }

    })

});

router.get('/novel.html', function(req, res){

    res.render('novel');

})

router.get('/novelSearch', function(req, res){
    var Res = res;  //保存，防止下边的修改
    var searchkey = req.query.novelName=="undefined"||!req.query.novelName||req.query.novelName==""?"道君":req.query.novelName;
    var page = req.query.page;
    var url = 'https://so.88dush.com/search/index.php?q='+encodeURIComponent(searchkey)+'&page='+page;

    // console.log('query',req.query.searchkey);
    console.log('req.query',req.query);
    console.log('url',url);
    // m.cits0871.com
    // so.88dush.com || m.hehuamei.com
    // m.biqugex.com

    // http://m.sodu.cc
    // http://zuiyidu.com

    // https://so.88dush.com/search/index.php?q=%E7%95%AA%E8%8C%84

    utils.httpGet(http,url).then((htmlString)=>{
        try {
            var sharedSandbox = {
                CLog       :console,
                htmlString : '',
                cheerio    : cheerio,
                iconv      : iconv,
                Date       : new Date(),
                parserInfo : {},                              ///parser内部信息
                result     : {},                                  ///返回结果
                vm         :vm
              };

            var parserCode = fs.readFileSync('./parser/parser_novelList.js');

            // zlib.gunzip(htmlString, function(err, decoded) {

                sharedSandbox.htmlString = htmlString.toString();
                // htmlString           = iconv.decode(htmlString,'gbk');

                vm.runInNewContext(parserCode, sharedSandbox);

                Res.send({
                    data:sharedSandbox.result,
                    success:true
                });

            // })

            // vm.runInNewContext(parserCode, sharedSandbox);

            // Res.send({
            //     data:sharedSandbox.result,
            //     success:true
            // });

        } catch (error) {

            console.log('parser error:',error);

        }

    })




});

router.get('/novelInfo', function(req, res){
    var Res = res;  //保存，防止下边的修改
    var novelId = req.query.novelId=='undefined'||!req.query.novelId?"85948/":req.query.novelId;
    var url = 'https://m.88dush.com/info/'+novelId;

    console.log('req.query',req.query);
    console.log('url',url);

    utils.httpGet(http,url).then((htmlString)=>{
        try {
            var sharedSandbox = {
                CLog       :console,
                htmlString : '',
                cheerio    : cheerio,
                iconv      : iconv,
                Date       : new Date(),
                parserInfo : {},                              ///parser内部信息
                result     : {},                                  ///返回结果
                vm         :vm
              };

            var parserCode = fs.readFileSync('./parser/parser_novelInfo.js');

            // zlib.gunzip(htmlString, function(err, decoded) {

                // sharedSandbox.htmlString = htmlString.toString();

                // sharedSandbox.htmlString = decoded.toString();
                sharedSandbox.htmlString = iconv.decode(htmlString,'gbk');

                vm.runInNewContext(parserCode, sharedSandbox);

                Res.send({
                    data:sharedSandbox.result,
                    success:true
                });

            // })

            // vm.runInNewContext(parserCode, sharedSandbox);

            // Res.send({
            //     data:sharedSandbox.result,
            //     success:true
            // });

        } catch (error) {

            console.log('parser error:',error);

        }

    })

});

router.get('/novelContent', function(req, res){
    var Res = res;  //保存，防止下边的修改
    var novelUrl = req.query.novelUrl=='undefined'||req.query.novelUrl==''?"https://m.88dush.com/book/865-273751/":req.query.novelUrl;
    var url = novelUrl;

    console.log('req.query',req.query);
    console.log('url',url);

    if(!novelUrl){
        Res.send({
            data:{},
            error:'缺少参数',
            success:false
        });
    }else{

        utils.httpGet(http,url).then((htmlString)=>{
            try {


                var sharedSandbox = {
                    CLog       :console,
                    htmlString : "",
                    cheerio    : cheerio,
                    iconv      : iconv,
                    Date       : new Date(),
                    parserInfo : {},                              ///parser内部信息
                    result     : {},                                  ///返回结果
                    vm         :vm
                  };

                var parserCode = fs.readFileSync('./parser/parser_novelContent.js');

                // zlib.gunzip(buff, function(err, decoded) {
                //     sharedSandbox.htmlString = decoded.toString();
                // })
                // sharedSandbox.htmlString = htmlString.toString();
                sharedSandbox.htmlString = iconv.decode(htmlString,'gbk');

                // console.log('sharedSandbox.result',sharedSandbox.htmlString)

                vm.runInNewContext(parserCode, sharedSandbox);


                Res.send({
                    data:sharedSandbox.result,
                    success:true
                });

            } catch (error) {

                console.log('parser error:',error);

            }

        })
    }





});

router.get('/novelCate', function(req, res){
    var Res = res;  //保存，防止下边的修改
    var novelUrl = req.query.novelUrl;
    var url = 'https://m.88dush.com'+novelUrl;
    console.log('req.query',req.query);
    console.log('url',url);

    if(!novelUrl){
        Res.send({
            data:{},
            error:'缺少参数',
            success:false
        });
    }else{

        utils.httpGet(http,url).then((htmlString)=>{
            try {


                var sharedSandbox = {
                    CLog       :console,
                    htmlString : "",
                    cheerio    : cheerio,
                    iconv      : iconv,
                    Date       : new Date(),
                    parserInfo : {},                              ///parser内部信息
                    result     : {},                                  ///返回结果
                    vm         :vm
                  };

                var parserCode = fs.readFileSync('./parser/parser_cate.js');

                // zlib.gunzip(buff, function(err, decoded) {
                //     sharedSandbox.htmlString = decoded.toString();
                // })
                // sharedSandbox.htmlString = htmlString.toString();
                sharedSandbox.htmlString = iconv.decode(htmlString,'gbk');

                // console.log('sharedSandbox.result',sharedSandbox.htmlString)

                vm.runInNewContext(parserCode, sharedSandbox);


                Res.send({
                    data:sharedSandbox.result,
                    success:true
                });

            } catch (error) {

                console.log('parser error:',error);

            }

        })
    }





});
module.exports = router;
// router.get('/novelSearch', function(req, res){
//     var Res = res;  //保存，防止下边的修改
//     var searchkey = req.query.novelName=="undefined"||!req.query.novelName?"":req.query.novelName;
//     // console.log('query',req.query.searchkey);
//     console.log('req.query',req.query);

//     // m.cits0871.com
//     // so.88dush.com || m.hehuamei.com
//     // m.biqugex.com

//     // http://m.sodu.cc
//     // http://zuiyidu.com

//     // https://so.88dush.com/search/index.php?q=%E7%95%AA%E8%8C%84

//     // post  =  querystring.parse(post);
//     // res.end(util.inspect(post));
//     let postData = {
//         keyword: searchkey,
//         t: 1
//     }
//     const options = {
//         hostname: 'm.cits0871.com',
//         port: 80,
//         path: '/s.php',
//         method: 'POST',
//         encoding : null,
//         headers: {
//             "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
//             "Accept-Encoding": "gzip, deflate",
//             "Accept-Language": "zh-CN,zh;q=0.9",
//             "Cache-Control": "max-age=0",
//             "Connection": "keep-alive",
//             // Content-Length: 30
//             "Content-Type": "application/x-www-form-urlencoded",
//             // "Cookie": Hm_lvt_28dca3408b4d7b74d7cb72f2ec2b7f80=1555858646; PHPSESSID=807a6faa78b2d2cb62be9d8a74a83bf4; Hm_lpvt_28dca3408b4d7b74d7cb72f2ec2b7f80=1555860533
//             "Host": "m.cits0871.com",
//             "Origin": "http://m.cits0871.com",
//             "Referer": "http://m.cits0871.com/",
//             "Upgrade-Insecure-Requests": 1,
//             "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
//         }
//     };


//     utils.httpPost(http,options,querystring.stringify(postData)).then((buffer,charset)=>{

//         try {
//             var sharedSandbox = {
//                 CLog       :console,
//                 htmlString : '',
//                 cheerio    : cheerio,
//                 iconv      : iconv,
//                 Date       : new Date(),
//                 parserInfo : {},                              ///parser内部信息
//                 result     : {},                                  ///返回结果
//                 vm         :vm
//               };

//             var parserCode = fs.readFileSync('./parser/parser_novelList.js');

//             zlib.gunzip(buffer, function(err, decoded) {

//                 sharedSandbox.htmlString = decoded.toString();



//                 vm.runInNewContext(parserCode, sharedSandbox);

//                 Res.send({
//                     data:sharedSandbox.result,
//                     success:true
//                 });

//             })

//         } catch (error) {

//             console.log('parser error:',error);

//         }

//     })

// });
