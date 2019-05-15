<template lang="html">
  <section>
    <section class="select_area" :style="areaStyle" v-if="isshow">
      <section class="select" v-for="(select,index) in data" :key="index">
        <section class="label" :class="index==active?'active':''" :style="labelStyle" @click="showOption(index)">
          <span class="label-text">{{select.label}}</span>
        </section>
      </section>
      <section class="options">
        <section class="option-area" v-for="(select,index) in data" :key="index">
          <section class="option" :data-value="option.value" ref="dataValue" v-for="(option,key) in select.option" :key="key" v-show="showOptions[index].show" @click="getChange($event,index,key)">
            <span class="option-text">{{option.name}}</span>
          </section>
        </section>
      </section>
    </section>
    <section :style="nouse"></section>
  </section>

</template>

<script>
/*      组件说明
    参数说明
   data：传进来的参数格式为[{label:"标题",[{name:"选项名",value:"选项值"}]}]     最多四个选项，最少一个
   align:标题对齐方式， 值为：left和center， 默认left
   fix:是否固定在顶部， 可选：true，false  默认为false
   方法说明
   @change="getSelectResult($event):但参数改变时获取返回结果
   示例
   html:  <Vselect :data="select" @change="getSelectResult($event)"></Vselect>
   js:    select:[{
             label:"价格",
             option:[{name:'100元',value:100},{name:'200元',value:200},{name:'300元',value:300},]
           },{
             label:"距离",
             option:[{name:'1000M',value:1000},{name:'2000M',value:2000},{name:'3000M',value:3000},{name:'全城',value:"all"},]
           },{
             label:"帅不帅",
             option:[{name:"很帅",value:"asc"},{name:"不帅",value:"desc"},]
           }
         ]
         getSelectResult(e){ console.log(e);}
*/
  export default {
    props:['data','align','fix'],
    data(){
      return {
        //参数错误则不显示ui组件
        isshow:true,
        //显示的option内容
        showOptions:[],
        //选中的下拉框
        active:-1,
        //下拉框的选值
        active2:[],
        //返回信息
        res:{code:0,msg:'success'},
        // 整个组件样式
        areaStyle:'',
        //标题样式
        labelStyle:'',
        //负责占位的样式
        nouse:"",
        //处理结果
        result:[],
      }
    },
    methods:{
      //初始化设置
      init(){
        for(var i=0;i<this.data.length;i++){
          this.showOptions.push({'show':false});
          this.active2.push({'choose':-1});
          this.result.push(null);
        }
      },
      //检验标准
      ifTrue(){
        if(this.data.length>4||this.data.length<1){
          this.res = {
            code:-1,
            msg:'Vselect选项必须有1-4个'
          };
        }else if (typeof(this.align) != 'undefined' && this.align!="left" && this.align!="center"){
          this.res = {
            code:-2,
            msg:'align参数错误，默认为left，可选值为left、center'
          };
          return false
        }else if (typeof(this.fix) != 'undefined' && this.fix!='' && this.fix!="true" && this.fix!="false"){
          this.res = {
            code:-3,
            msg:'fix参数错误，默认为false，可选值为true、false'
          };
        }
        else{
          return true;
        }
      },
      //进行渲染
      isTrue(){
        if(this.ifTrue()){
          this.setLabelWidth();
          this.setAlign();
          this.setFix();
        }else{
          this.isshow = false;
          console.log({error:this.res});
        }
      },
      //设置宽度
      setLabelWidth(){
        this.labelStyle += `width:${750/this.data.length}rpx;`;
      },
      //设置对齐方式
      setAlign(){
        if(this.align=='center'||this.align=='left'){
          this.labelStyle += `text-align:${this.align};`;
        }
      },
      //设置固定
      setFix(){
        if(this.fix=="true" || this.fix==''){
          this.areaStyle+="position:fixed;top:0;"
          this.nouse+="height:39px;"
        }
      },
      // 显示选项
      showOption(index){
        //设置样式
        if(this.active == index){
          this.active = -1;
        }else{
          this.active = index;
        }
        //显示选项
        if(this.showOptions[index].show == true){
          this.showOptions[index].show = false;
        }else{
          for(var i=0;i<this.showOptions.length;i++){
            this.showOptions[i].show = false;
          }
          this.showOptions[index].show = true;
        }
      },
      //一改变获取结果函数
      getChange(e,index,key){
        this.active2[index].choose = key;
        this.result[index] = e.currentTarget.dataset.value;
        this.$emit('change',this.result)
      },


    },
    mounted(){
      this.isTrue();
    },
    created(){
      this.init();
    }
  }
</script>

<style  scoped>
  .select_area{
    width: 750rpx;
    height: auto;
    background: white;
  }
  .select{
    display:inline-block;
  }
  .label{
    padding-top: 8px;
    height: 30px;
    font-size: 16px;
    text-align:left;
  }
  .label-text{
    padding-left: 10px;
  }
  .active{
    color:#fe7723;
  }
  .options{
    animation: 5px;
    border-bottom: 1px solid #CCCCCC;
  }
  .option-area{
    max-height: 230px;
    overflow:auto;
  }
  .option{
    border-top: 1px solid #CCCCCC;
    padding: 5px;
    font-size: 16px;
    line-height:40px;
    position: relative;
  }
  .option-text{
    font-size: 18px;
    height: 25px;
    margin-left:50px;
  }
  .labelImg{
    padding-left: 8px;
    padding-top: 0px;
    width: 12px;
    height: 12px
  }
  .optionImg{
    position: absolute;
    margin-top: 4px;
    margin-left: 8px;
    width: 30px;
    height: 30px;
  }
</style>

