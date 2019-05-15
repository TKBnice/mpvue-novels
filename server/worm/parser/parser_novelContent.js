
var _VER = '1.0.3';
var _INDEX = 0;
var _TYPE = 'website:https://m.88dush.com';
var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;
// htmlString           = iconv.decode(htmlString,'gbk');
var $ = cheerio.load(htmlString);

var data = {};
var source = 'https://m.88dush.com';

data.novelContent = '';


function parsePageItems() {

    try {
        
        data.nextUrl = source+$('#pt_next').attr('href');
        data.novelTitle = $('#nr_title').text().trim();
        data.novelContent = $('#nr #nr1').html();
        
        var prevUrl = $('#pt_prev').attr('href');
        var novelCat = $('#pt_mulu').attr('href');

        // /info/865/
        novelCat = novelCat.substring(0,novelCat.length-1);

        if(prevUrl.indexOf('info')>-1){

            prevUrl = $('#pt_prev').attr('href').replace('/info/','');

            prevUrl = prevUrl.substring(0,prevUrl.length-1)+'/';

            data.prevUrl = prevUrl;

        }else{
            data.prevUrl = source + prevUrl;
        }

        data.novelCat = novelCat+'-';

        // console.log(data.novelContent);
    } catch (e) {
        console.log(e);
    }
}



function checkResult() {

    if (!data.novelContent||data.novelContent =='') {
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