var _VER = '1.0.3';
var _INDEX = 0;
var _TYPE = 'website:https://so.88dush.com';
var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;
// 平台搜索
// htmlString           = iconv.decode(htmlString,'utf-8');

var $ = cheerio.load(htmlString);
// var currentData =       JSON.parse(htmlString);

var data = {};
var source = 'https://so.88dush.com';
data.items = [];

function parsePageItems() {

    var total = 0;
    var pageSize = 10;

    try {

        
        if ($('.cover>.block').length>0) {

            $('.cover>.block').each(function (i, elem) {
                if(i<100){
                    // CLog.info('---------------novelName',$(elem).find('.block_txt>h2>a').text());
                    var novelName = $(elem).find('.block_txt>h2>a').text().trim();
                    var novelPicUrl = $(elem).find('.block_img>a>img').attr('src');
                    var novelUrl =  $(elem).find('.block_txt>h2>a').attr('href');
                    var novelAuthor = $(elem).find('.block_txt').find('>p').eq(-3).text().trim();
                    // var novelAuthorUrl = source + $(elem).find('.pt-ll-r>.info>span').eq(1).find('>a').attr('href');
                    var novelClass = $(elem).find('.block_txt').find('>p').eq(-2).text().trim();
                    // var novelClassUrl = source + $(elem).find('.pt-ll-r>.info>span').eq(2).find('>a').attr('href');
                    var novelIntro = $(elem).find('.block_txt').find('>p').eq(-1).text().trim();
                    // var novelLast = $(elem).find('a>.author').eq(1).text();
                    // var novelLastUrl = source + $(elem).find('.pt-ll-r>.last').attr('href');
                    var novelId = novelUrl.replace('https://m.88dush.com/info/','')
                    // "https://m.88dush.com/info/101574/"

                    var it = {
                        novelName,
                        novelPicUrl,
                        // novelUrl,
                        novelAuthor,
                        // novelAuthorUrl,
                        novelClass,
                        // novelClassUrl,
                        novelIntro,
                        // novelLast,
                        // novelLastUrl,
                        novelId
                    }
                    data.items.push(it);
                }
            })

            if($('.ops_m_page>.btn_page').length>0){
                total = $('.ops_m_two>em').last().text().trim();
            }else{
                total = data.items.length;
            }

        }
        data.total = +total;
        data.pageSize = pageSize;

    } catch (e) {
        console.log(e);
    }
}

function getUrlParam(param, url) {
    var theRequest = new Object();
    var newUrl = "";
    if (!url) return theRequest;
    if (url.indexOf(param) == -1) return 1;
    if (url.indexOf("?") !== -1) {
        var urlBefore = url.substring(0, url.indexOf("?"))
        var str = url.substr(url.indexOf("?") + 1) + "&";
        var strs = str.split("&");
        for (var i = 0; i < strs.length - 1; i++) {
            var key = strs[i].substring(0, strs[i].indexOf("="));
            var val = strs[i].substring(strs[i].indexOf("=") + 1);

            theRequest[key] = val;
        }

    }
    return theRequest[param];
}

function checkResult() {

    if (data.items.length < 1) {
        return -11;
    }
    return 0;
}


try {

    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    parsePageItems();

    result = data;
    // CLog.info('result:\n'+JSON.stringify(result));

    result.handler = _INDEX;
    // if (checkResult() == 0) {
        result.retcode = _RETCODE_SUCCESS;
        CLog.info('parser_novelList success : ');
    // } else {
    //     result.retcode = _RETCODE_ERROR;
    //     result.errorResponse = htmlString;
    //     CLog.error('parser_novelList failed : ');
    // }

} catch (e) {
    result.retcode = _RETCODE_ERROR;
    CLog.error('parser_novelList excption : ' + e.message);
    CLog.error('parser_novelList excption :' + e.stack);
}