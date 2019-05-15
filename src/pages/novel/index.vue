<template>
<div >
  <div class="pd10-content" >
    <div class="clearOH content-hd">
      <div class="fl">
          <!-- mpvue.navigateTo({ url }) -->
          <img :src="novelINfo.novelPicUrl" class="novelImg" >
      </div>
      <div class="novelInfo fl">
        <p class="novelName">{{novelINfo.novelName}}</p>
        <p >{{novelINfo.novelAuthor}} </p>
        <p >{{novelINfo.novelClass}}</p>
        <p >{{novelINfo.novelStatus}}</p>
        <p >{{novelINfo.lastChapter}}</p>
      </div>
    </div>
    <div >
      <div class="btnWrap" >
        <i-button  class="defaultButton"  shape="circle" type="warning"  size="small">加入书架</i-button>
        <i-button  @click="handleNavigateTo(novelINfo.novelUrl)" class="defaultButton"  shape="circle" type="success"  size="small">开始阅读</i-button>
      </div>
    </div>
    <div>
      <p class="content-title" >小说简介</p>
      <p class="novelIntro">{{novelINfo.novelIntro}}</p>
    </div>
  </div>
  <div class="pd10-content" style="background-COLOR:#f4f4f4;padding-bottom:30px;">
    <div class="novelChapters">
      <ul>
        <li @click="handleNavigateTo(chapter.chapterUrl)" class="chapter" v-for="(chapter,n) in novelINfo.novelChapters" >
          <a >{{chapter.chapterName}}<i-icon class="fr icon-r" type="enter" size="16"/></a>
        </li>
      </ul>
      <div class="catalogue" >
        <a :href="'../novelChapters/main?novelUrl='+novelINfo.novelChapterUrl" class="counter">查看目录</a>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>本站所有小说由网友上传，如有侵犯版权，请来信告知，本站立即予以处理。</p>
  </div>
</div>

</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      novelId:'',
      novelINfo:{}
    }
  },
  onLoad(){
    this.novelId = '';
    this.novelINfo = {};
  },
  mounted () {
    this.getNovelInfo();
  },
  methods :{
    getNovelInfo(){
      this.novelId = this.getQuery().novelId;
      // console.log('novelId---',novelId);
      this.$httpWX.get({
        url: '/novelInfo',
        data:{
          novelId:this.novelId
        }
      }).then(res => {
        this.novelINfo = res.data.novelINfo;
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
    handleNavigateTo(url){

      mpvue.navigateTo({ url: `../novelContent/main?novelUrl=${url}`});
    }
  }
}
</script>

<style scoped>

.btnWrap{
  display:flex;
  justify-content:center;

}
.content-title{
  border-bottom:2px solid #208181;
  font-size:16px;
  font-weight:bold;
  padding:5px;
  background-color:#ecf0f0;
}
.content-hd{
    border-bottom:1px dashed #ddd;
  padding-bottom: 5px;
}
.novelImg{
  width: 90px;
  height: 120px;
  border: 1px solid #eee;
}
.novelInfo{
  padding:0 5px;
  font-size: 14px;

}
.novelInfo>p{
  padding-top:5px;
  width: 244px;
}
.novelInfo .novelName{
  font-size:16px;
  padding-top:0;
  font-weight: bold;
}
.defaultButton{
  width:180px;
}
.novelIntro{
  display: -webkit-box;
  margin-top: 10px;
  width: 355px;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  font-size: 13px;
  color: #666;
  line-height: 20px;
}
.novelChapters{
  background-COLOR:#fff;
  border: 1px solid #dfdfdf;
}
.chapter{
  width: 100%;
  overflow: hidden;
}
.chapter>a{
  position: relative;
  height: 38px;
  line-height: 38px;
  padding: 0px 20px 0px 8px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  color: #4c4c4c;
  display: block;
  margin: 0;
  background-size: 138px;
  background-position: right -50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.chapter>a>.icon-r{
  position: absolute;
  right: 10px;
}
.catalogue>a{
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #eee;
    font-size: 16px;
    text-align: center;
}

</style>
