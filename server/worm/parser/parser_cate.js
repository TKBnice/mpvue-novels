
var _VER = '1.0.3';
var _INDEX = 0;
var _TYPE = 'website:https://m.88dush.com';
var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;
// htmlString           = iconv.decode(htmlString,'gbk');
var $ = cheerio.load(htmlString);

var data = {};
var source = 'https://m.88dush.com';

function parsePageItems() {

    try {

        data.novelName = $('.cover>.read>h3').text().trim();
        data.ascUrl = $('.cover>.read>span a').eq(0).attr('href');
        data.revUrl = $('.cover>.read>span a').eq(1).attr('href');
        
        data.novelChapters = [];
        
        var novelChapterUrl = $('.header>h1>a').attr('href');
        novelChapterUrl = novelChapterUrl.substring(0,novelChapterUrl.length-1)
        data.novelChapterUrl = novelChapterUrl.replace('info','mulu')+'-';

        var pageInfo = $('.page').last().find('p').text().trim();
        pageInfo = pageInfo.match(/\(.*?\)/g)[0];// (第1/6页)
        pageInfo = pageInfo.replace(/\(|第|\)|页/g,'');
        pageInfo = pageInfo.split('/');
        
        data.maxPage = parseInt(pageInfo[1]);
        data.page = parseInt(pageInfo[0]);

        console.log('pageInfo---',pageInfo);

        var $novelChapters = $('.cover>.chapter');

        $novelChapters.find('>li').each(function(){
            var $item = $(this).find('>a');
            $item.find('span').empty();
            data.novelChapters
            .push({
                chapterName:$item.text().trim(),
                // chapterTime:$item.find('span').text().trim(),
                chapterUrl:source+$item.attr('href'),
            })
        })
    } catch (e) {
        console.log(e);
    }
}



function checkResult() {

    if (!data.novelName||data.novelChapters.length ==0) {
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
    if (checkResult() == 0) {
        result.retcode = _RETCODE_SUCCESS;
        CLog.info('parser_novelContent success : ');
    } else {
        result.retcode = _RETCODE_ERROR;
        result.errorResponse = htmlString;
        CLog.error('parser_novelContent failed : ');
    }

} catch (e) {
    result.retcode = _RETCODE_ERROR;
    CLog.error('parser_novelContent excption : ' + e.message);
    CLog.error('parser_novelContent excption :' + e.stack);
}