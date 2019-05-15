<template>
  <div>

      <div class="chapter-head">
        <div class="nove-name">{{novelName}}</div>
        <div class="chapter-order" slot="footer">
          <span @click="handleOrder(ascUrl,'asc')" class="fl" :class="{'active':sorteType=='asc'?true:false}" style="border-right:1px solid #4394ff;">正序</span>
          <span @click="handleOrder(revUrl,'rev')" class="fl" :class="{'active':sorteType=='rev'?true:false}">倒序</span>
        </div>
      </div>
      <view  style="height:57px;line-height:52px;">
      </view>

    <i-cell-group >
        <i-cell
          is-link
          :url="'../novelContent/main?novelUrl='+chapter.chapterUrl"
          v-for="(chapter,i) in novelChapters"
          :title="chapter.chapterName"
          :key="i">
        </i-cell>
    </i-cell-group>

    <pagination
      mode="simple"
      ref="pagination"
      :pageSize="pageSize"
      :curPage="page"
      :totalPage="maxPage"
      @setPage="changePage"
      />

    <div class="footer">
      <p>本站所有小说由网友上传，如有侵犯版权，请来信告知，本站立即予以处理。</p>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination'
import Vselect from '@/components/Vselect'

export default {
  components: {pagination,Vselect},
  data() {
    return {
      sorteType:'asc',
      novelUrl:'',
      novelName:'',
      ascUrl:'',
      revUrl:'',
      novelChapters:[],
      page:1,
      maxPage:1,
      pageSize:30
    };
  },
  onPageScroll (e) {

  },
  onLoad() {
    this.novelUrl = '';
  },
  mounted() {
    this.getContentByQuery()
  },
  methods: {
    handleOrder(url,sorteType){
      this.page = 1;
      this.sorteType = sorteType;
      this.getChapterContent(url);
    },
    changePage(page){
      this.page = page;
      this.getContentByQuery();
    },
    getContentByQuery(){
      // this.novelUrl = this.getQuery().novelUrl;
      this.novelUrl = '/mulu/34171-';
      this.getChapterContent();
    },
    getChapterContent(sorteUrl){
      let novelUrl = '';
      if(this.sorteType=='rev'){
        novelUrl = this.novelUrl+this.page+'-1/';
      }else{
        novelUrl = this.novelUrl+this.page+'/'
      }
      this.$httpWX.get({
        url: '/novelCate',
        data:{
          sorteType:this.sorteType,
          novelUrl
        }
      }).then(res => {
        this.novelChapters = res.data.novelChapters;
        this.maxPage = res.data.maxPage;
        this.novelName = res.data.novelName;
        this.novelUrl = res.data.novelChapterUrl;
        this.ascUrl = res.data.ascUrl;
        this.revUrl = res.data.revUrl;

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

  }
};
</script>

<style scoped>
.chapter-head{
  width: 100%;
  padding:10px 15px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom:1px solid #ccc;
  z-index: 9;
  background: #fff;
}
.nove-name{
  font-size: 14px;
  color: red;
}
.chapter-order{
  display: inline-block;
  overflow: hidden;
  border: 1px solid #4394ff;
  border-radius: 5px;
  font-size: 12px;
  height: 24px;
  line-height: 22px;

}
.chapter-order>span{
  display: inline-block;
  padding: 0 5px;
  text-align: center;
  color: #4394ff;
}
.chapter-order>span.active{
  background-color:  #4394ff;
  color: #fff;
}
</style>
