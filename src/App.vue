
<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs;
    if (mpvuePlatform === "my") {
      logs = mpvue.getStorageSync({ key: "logs" }).data || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync({
        key: "logs",
        data: logs
      });
    } else {
      logs = mpvue.getStorageSync("logs") || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync("logs", logs);
    }
  },

  mounted() {
    let self = this;
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res)
          // 这里可以把code传给后台，后台用此获取openid及session_key
          self.$store.commit("SET_LOGINSTATUS", true);
          // self.$store.commit('SET_USERINFO',true)

          this.$httpWX.get({
            url: '/SetLoginStatus',
            data:{
              code: res.code,
              loginStus:true
            }
          }).then(res => {
            console.log(res)
          })

        }
      }
    });
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
        let self = this;
        wx.getUserInfo({
          success(res) {
            console.log(res.userInfo)
            self.$store.commit('SET_USERINFO',res.userInfo)
          },
          fail(err) {
            console.log(err);
          }
        })
    }
  },
  log() {
    console.log(`log at:${Date.now()}`);
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  /* box-sizing: border-box; */
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
blockquote, body, button, caption, dd, div, dl, dt, fieldset, figure, form, h1, h2, h3, h4, h5, h6, hr, html, input, legend, li, menu, ol, p, pre, table, td, textarea, th, ul {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
}
.clearOH {
  overflow: hidden;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.backTopBar{
  padding: 2px 4px 3px 4px;
  position: fixed;
  right:20px;
  bottom: 80px;
  background-color: rgba(0,0,0,.4);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;
}
.pd10-content{
  padding: 10px;
}
.ptm-btn {
    position: relative;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    background-color: #ddd;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.ptm-clearfix {
    clear: both;
    zoom: 1;
}
.ptm-col-xs-4 {
    width: 33.33333333%;
    position: relative;
    float: left;
}

.ptm-btn-primary {
    color: #fff;
    background-color: #1abc9c;
    border: 1px solid #1abc9c;
}
.ptm-btn-warning {
    color: #fff;
    background-color: #f82;
    border: 1px solid #f82;
}
.footer{
    font-size: 14px;
    height: 100px;
    line-height: 20px;
    padding: 10px 0 10px 0;
    text-align: center;
    color: #666;
    background-color: #f4f4f4;
    clear: both;
    border-top: 1px solid #e6e6e6;
}
</style>
