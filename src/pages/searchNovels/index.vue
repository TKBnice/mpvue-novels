<template>
  <div>
      <div class="wrapSerach" >
        <input confirm-type="search" v-model="searchVal" @confirm="handleSearch" class="searchInput"  maxlength="30" type='text' placeholder="请输入书名" />
        <i-icon class="searchIcon" type="search" size="20" color="#80848f" @click="handleSearch"/>
      </div>

      <div class="main">
        <div>
          <ul>
            <li  v-for="(item, n) in list" @click="handleNavigateTo(item.novelId)" :key="n">
              <div class="novel clearOH">
                <div class="fl">
                  <!-- <div class="num" :class="{ 'red': n==0?true:false,'deepblue': n==1?true:false}">{{n+1}}</div> -->
                  <!-- mpvue.navigateTo({ url }) -->
                    <img :src="item.novelPicUrl" class="novelImg" @error="item.novelPicUrl='https://m.88dush.com/modules/article/images/nocover.jpg'" >
                </div>
                <div class="novelInfo fl">
                  <p style="font-size:14px;">{{item.novelName}}</p>
                  <p style="padding:5px 0;">{{item.novelAuthor}} </p>
                  <p class="novelIntro">{{item.novelIntro}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="noResult" style="text-align:center;">
            对不起没有找到任何结果。
          </div>
        </div>
      </div>

      <!-- <div class="followRecords">
        <i-button
          open-type="getUserInfo"
          @getuserinfo="bindGetUserInfo"
        >获取用户信息</i-button>
      </div> -->

      <pagination
      v-if="total>0"
      mode="simple"
      ref="pagination"
      :pageSize="pageSize"
      :curPage="page"
      :total="total"
      @setPage="changePage"
      />
      <!-- <pagination>

      </pagination> -->
  </div>
</template>


<script>
import pagination from '@/components/pagination'

export default {
  data() {
    return {
      searchVal:"",
      noResult:false,
      dataChanged:false,
      page:1,
      total:0,
      pageSize:10,
      list:[]
    };
  },
  components: {pagination},
  methods: {
    changePage(page){
      this.page = page;
      this.getNovelList();
    },
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },

    handleNavigateTo(novelId){
      console.log('novelId',novelId);
      mpvue.navigateTo({ url: `../novel/main?novelId=${novelId}`});
    },
    handleClick(e) {
      console.log(e);
    },
    getUserInfoClick() {
      // console.log('click事件首先触发')
    },
    bindGetUserInfo(e) {//获取用户信息
      console.log(e.mp.detail.userInfo);
      // console.log('回调事件后触发')
      const self = this;
    },
    confirm(e) {//键盘搜索回调

    },
    getNovelList(){
        this.noResult = false;
        this.$httpWX.get({
          url: '/novelSearch?page='+this.page,
          data:{
            novelName:this.searchVal
          }
        }).then(res => {

          this.list = res.data.items;
          this.total = res.data.total;
          if(this.list.length<1&&!this.total){
            this.noResult = true;
          }
          console.log(res)
        })
    },
    handleSearch(){//搜索
      if(this.searchVal!=''){
        console.log(this.searchVal);
        this.page = 1;
        this.getNovelList();
      }
    }
  }
};
</script>

<style scoped>
.i-btn{
  margin:0!important;
}
.uerInfo {
  width: 100%;
  padding: 10px;
}
.wrapSerach{
  width: 100%;
  padding:10px;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
}
.searchIcon{
  position: absolute;
  right: 20px;
  top: 12px;
  z-index: 10;
}
.searchInput{
  background-color:#eee;height:32px;
  line-height:32px;
  border-radius:16px;
  padding-left:16px;
  font-size:14px;
}
.main{
  padding: 5px;
  margin-top:52px;
}
.novel{
  width: 100%;
  display: flex;
  font-size: 13px;
  border-bottom: 1px dashed #eee;
  padding: 5px;
}
.novelImg{
  width: 60px;
  height: 80px;
  border: 1px solid #eee;
}
.novelInfo{
  padding:0 5px;
}

.novelIntro{
    height: 40px;
    line-height: 20px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 13px;
}
.novel .num {
    text-align: center;
    letter-spacing: -1px;
    height: 25px;
    width: 30px;
    line-height: 25px;
    background: #B3B3B3;
    color: #fff;
    border-radius: 5px;
}
.skyblue{
  background: #edfaff!important;
}
.red{
  background: #FF3E3E!important;
}
.deepblue{
  background: #68aac2!important;
}
.prevBtn{

}
.nextBtn{

}
</style>
