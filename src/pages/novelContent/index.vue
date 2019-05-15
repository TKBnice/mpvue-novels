<template>
  <div>
    <div class="content pd10-content">
      <p class="title">{{novelTitle}}</p>
      <div class="clearOH" style="margin:10px auto;">
        <div class="ptm-col-xs-4">
          <span class="ptm-btn ptm-btn-primary"  @click="handleChangChapter(prevUrl)" style="display:block;margin:0 5px">上一章</span>
        </div>
        <div class="ptm-col-xs-4">
          <span class="ptm-btn ptm-btn-warning" @click="handleNavigateTo(novelCat)" style="display:block;margin:0 5px">回目录</span>
        </div>
        <div class="ptm-col-xs-4">
          <span
            class="ptm-btn ptm-btn-primary"
            @click="handleChangChapter(nextUrl)"
            style="display:block;margin:0 5px"
          >下一章</span>
        </div>
      </div>
      <div v-html="chaptercontent"></div>
      <div class="clearOH" style="margin:10px auto;">
        <div class="ptm-col-xs-4">
          <span class="ptm-btn ptm-btn-primary"  @click="handleChangChapter(prevUrl)" style="display:block;margin:0 5px">上一章</span>
        </div>
        <div class="ptm-col-xs-4">
          <span class="ptm-btn ptm-btn-warning" @click="handleNavigateTo(novelCat)" style="display:block;margin:0 5px">回目录</span>
        </div>
        <div class="ptm-col-xs-4">
          <span
            class="ptm-btn ptm-btn-primary"
            @click="handleChangChapter(nextUrl)"
            style="display:block;margin:0 5px"
          >下一章</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>本站所有小说由网友上传，如有侵犯版权，请来信告知，本站立即予以处理。</p>
    </div>
    <!-- <div class="backTopBar" v-show="backTopStatus" @click="goTop">
      <i-icon type="packup" size="32" color="#fff"/>
    </div>-->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      backTopStatus:false,
      prevUrl:'',
      nextUrl:'',
      novelCat:'',
      novelUrl:'',
      novelTitle:'',
      chaptercontent:""
    };
  },
  onPageScroll (e) {
    // console.log(e.scrollTop)
    this.backTopStatus = e.scrollTop > 1000 ? true : false;
  },
  onLoad() {
    // this.novelUrl = '';
  },
  mounted() {
    this.getContentByQuery()
  },
  methods: {
    handleChangChapter(url){
        if(url.indexOf('book')==-1){
          console.log('url',url);
          // mpvue.navigateTo({ url: `../novel/main?novelId=${url}`});
          mpvue.navigateBack({
                delta: 1  // 返回上一级页面。
          })
          return;
        }
        this.novelUrl = url;
        this.getNovelContent();
    },
    getContentByQuery(){
      this.novelUrl = this.getQuery().novelUrl;
      this.getNovelContent();
    },
    getNovelContent(){
        this.$httpWX.get({
          url: '/novelContent',
          data:{
            novelUrl:this.novelUrl
          }
        }).then(res => {
          this.novelTitle = res.data.novelTitle;
          this.chaptercontent = res.data.novelContent;
          this.prevUrl = res.data.prevUrl;
          this.nextUrl = res.data.nextUrl;
          this.novelCat = res.data.novelCat;
          console.log(res)
        })
    },
    getQuery () {//获取导航参数
      /* 获取当前路由栈数组 */
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const options = currentPage.options
      // console.log(options);
      return options
    },
    goTop () {  // 一键回到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },
    handleNavigateTo(url){
      mpvue.navigateTo({ url: `../novelChapters/main?novelUrl=${url}`});
    }
  }
};
</script>

<style scoped>
.content {
  line-height: 250%;
  font-size: 14px;
  background-color: rgb(220, 236, 210);
}
.title {
  font-weight: 700;
  text-align: center;
  padding: 10px;
  font-size: 18px;
  text-indent: 0;
}
</style>
