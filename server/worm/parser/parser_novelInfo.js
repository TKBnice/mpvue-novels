
var _VER = '1.0.3';
var _INDEX = 0;
var _TYPE = 'website:https://m.88dush.com';
var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;

var $ = cheerio.load(htmlString);

var data = {};
var source = 'https://m.88dush.com';

data.novelINfo = {}


function parsePageItems() {

    try {

        var novelPicUrl = $('.cover>.block>.block_img>img').attr('src');
        var novelName = $('#bookname>a').text().trim();
        var novelChapterUrl = $('#bookname>a').attr('href').replace('/info/','');
        novelChapterUrl = novelChapterUrl.substring(0,novelChapterUrl.length-1)+'/';
        // /info/71885/
        var novelAuthor = $('.cover>.block>.block_txt').find('>p').eq(2).text().trim();
        // var novelAuthorUrl= source+$('.ptm-content>.baseinfo>.pt-novel').find('.pt-info').eq(0).find('a').attr('href');
        var novelClass = $('.cover>.block>.block_txt').find('>p').eq(3).text().trim();
        // var novelClassUrl = source+$('.ptm-content>.baseinfo>.pt-novel').find('.pt-info').eq(1).find('a').attr('href');
        var novelStatus = $('.cover>.block>.block_txt').find('>p').eq(4).text().trim();
        // var sourceWeb = $('.ptm-content>.baseinfo>.pt-novel').find('.pt-info').eq(2).text();
        var lastChapter = $('.cover>.block>.block_txt').find('>p').last().text().trim();
        var novelIntro = $('.cover>.intro_info').text().trim();

        var novelUrl = $('#notice input[value="开始阅读"]').attr('onclick').replace('location.href= ','').replace(/\'/g,"");

        data.novelINfo = {
            novelUrl,
            novelName,
            novelPicUrl,
            novelAuthor,
            // novelAuthorUrl,
            novelClass,
            // novelClassUrl,
            novelStatus,
            novelIntro,
            // sourceWeb,
            novelChapterUrl,
            lastChapter
        }

        

        data.novelINfo.novelChapters = [];

        var $novelChapters = $('#chapterlist2');

        $novelChapters.find('>li').each(function(){
            var $item = $(this).find('>a');
            $item.find('span').empty();
            data.novelINfo.novelChapters
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

    if (!data.novelINfo.novelName||data.novelINfo.novelName =='') {
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
    CLog.info('result:\n'+JSON.stringify(result));

    result.handler = _INDEX;
    if (checkResult() == 0) {
        result.retcode = _RETCODE_SUCCESS;
        CLog.info('parser_novelInfo success : ');
    } else {
        result.retcode = _RETCODE_ERROR;
        result.errorResponse = htmlString;
        CLog.error('parser_novelInfo failed : ');
    }

} catch (e) {
    result.retcode = _RETCODE_ERROR;
    CLog.error('parser_novelInfo excption : ' + e.message);
    CLog.error('parser_novelInfo excption :' + e.stack);
}