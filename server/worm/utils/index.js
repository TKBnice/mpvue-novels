
module.exports={
    httpGet(http,url) {
      return new Promise (function(resolve,reject) {
          http.get(url,function(res){  //通过get方法获取对应地址中的页面信息
              var chunks = [];
            //   var size = 0;
              res.on('data',function(chunk){   //监听事件 传输
                  chunks.push(chunk);
                //   size += chunk.length;
              });
              res.on('end',function(){  //数据传输完
                  resolve(Buffer.concat(chunks))
              });
          }).on('error', function(err){
              reject(err)
          });
      })
  },
  httpPost(http,options,postData){
      return new Promise (function(resolve,reject) {
        const chunks = [];
        const req = http.request(options, (res) => {
            // res.setEncoding('utf-8');
            res.on('data', (chunk) => {
                 // 分次将 buff 数据存入 chunks
                 chunks.push(chunk);
            });
            res.on('end', () => {
                // 合并数组生成 buff 对象
                let buff = Buffer.concat(chunks), headers = res.headers;
                // 从响应头中提取 charset;

                let charset = headers['content-type'];
                // 转编码，保持跟响应一致
                // console.log('headers',headers);
                resolve(buff,charset);
            });
          });
          
          req.on('error', (e) => {
            console.log('httpPost error');
            reject(e.message)
          });
          // write data to request body
          req.write(postData);
          req.end();

      })
  }
}

    // // 定义了一个post变量，用于暂存请求体的信息
    // var post = '';     
 
    // // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    // req.on('data', function(chunk){    
    //     post += chunk;
    // });
 
    // // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    // req.on('end', function(){    
    //     post = querystring.parse(post);
    //     res.end(util.inspect(post));
    // });