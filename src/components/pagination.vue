<template>
    <div class="pager">
      <div v-if="model=='simple'" class="main simple">
        <!-- <span  v-show="showFirstPage" v-on:click="firstPage" >首页</span> -->

        <span  v-on:click="prevPage" ><button :disabled="curPage==1" class="pager-btn" >上一页</button></span>
        <span><span style="color:#2d8cf0;">{{curPage}}</span>/{{maxPage}}</span>
        <span  v-on:click="nextPage" ><button :disabled="curPage==maxPage" class="pager-btn">下一页</button></span>
        <!-- <span  v-show="showLastPage" v-on:click="lastPage" >尾页</span> -->
      </div>
      <div v-else class="main">
        <span><button  v-show="curPage>1" v-on:click="firstPage" class="pager-btn">首页</button></span>

        <span   v-on:click="prevPage" ><button :disabled="curPage==1" class="pager-btn" >上一页</button></span>
        <span><span style="color:#2d8cf0;">{{curPage}}</span>/{{maxPage}}</span>
        <span   v-on:click="nextPage" ><button :disabled="curPage==maxPage" class="pager-btn">下一页</button></span>
        <span><button  v-show="curPage<maxPage" v-on:click="lastPage" class="pager-btn">尾页</button></span>
      </div>
      <!-- <div v-if="model!=='simple'" style="  display: flex;align-items: center;justify-content: center;  ">
        <div class="goto">
          <view><input type="text" v-model="gotoPage" /></view>
          <span  v-on:click="gotoNextPage" ><button class="pager-btn">跳转</button></span>
        </div>
      </div> -->


        <!-- <div>
            <select v-model="rowNum">
                <option value="10">10</option>
                <option selected="selected" value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div> -->
    </div>
</template>

<script>
export default {
    mounted() {
        this.$nextTick(() => { this.initPager() }) //需要延迟初始化
    },
    name: 'Pager',
    data () {
        return {
            "gotoPage":"",
            "showFirstPage":true,
            "showLastPage":true,
            "showPrevPage":true,
            "showNextPage":true,
            "rowNum":this.pageSize
        }
    },
    methods:{
        nextPage(){//下一页
            let page = this.curPage+ 1;
            if(page>this.maxPage) return;
            this.$emit('setPage', page ) //调用父组件方法
        },
        prevPage(){//上一页
            let page = this.curPage- 1;
            if(page<1) return;
            this.$emit('setPage', page ) //调用父组件方法
        },
        gotoNextPage(){//跳转页面
            if(this.gotoPage && /[1-9][0-9]*/.test(this.gotoPage)){
                var pg = parseInt(this.gotoPage)
                if(pg > 0 && pg <= this.pageSize){
                    this.$emit('setPage', pg ) //调用父组件方法
                }else{
                    this.gotoPage = ""
                }
            }else{
                this.gotoPage = ""
            }
        },
        firstPage(){
            this.$emit('setPage', 1 ) //调用父组件方法
        },
        lastPage(){
            this.$emit('setPage', this.maxPage ) //调用父组件方法
        },
        rowNumChanged(){
            this.$emit('setRowNum', this.rowNum )
        },
        initPager(){
            this.showFirstPage = this.curPage> 1
            this.showLastPage = this.curPage< this.total
            this.showPrevPage = this.curPage> 1
            this.showNextPage = this.curPage< this.total
            this.gotoPage = ""
        }
    },
    computed:{
      maxPage(){
        if(this.totalPage&&this.totalPage!=''&&this.totalPage!=undefined) return this.totalPage
        return Math.ceil(this.total/this.pageSize)
      }
    },
    props:[
        "pageSize","curPage","total",'model','totalPage'
    ],
    watch:{
        'rowNum':'rowNumChanged' //监控rowNum
    }
}
</script>
<style scoped>

.pager{
    width: 100%;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 30px;
}
.pager .main{
  display: flex;
  justify-content: space-around;
}

.pager .main>span{
  display: inline-block;
}
.pager .pager-btn{
  display: inline-block;
  padding: 0 10px;
  border-radius:2px;
  font-size: 14px;
  background: #fff;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.1);

}
.pager input,.pager select{
    height:34px;
    line-height:34px;
    outline:none;
    border:1px solid #ccc;
    padding:0 10px;
    box-sizing:border-box;

}
.pager input{
    width: 36px;
    border-radius: 2px;
}
.pager .goto{
  display: flex;


}
.pager a{
    color: black;
    font-weight: bold;
    text-decoration: none;
}
.pager a:hover{
    color: green;
}

</style>
