<template>
  <div>
    <button>上一页</button>
    <button>1</button>
    <button>1</button>
    <button>1</button>
    <button>下一页</button>
    <button>共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination1",
  props: ["pageNo", "total","pageSize", "continues"],
  computed:{
      //计算连续页的start和end
      StartNumberAndEndNumber(){
          let {pageNo,total,continues} = this;
          let start = 0 ,end = 0 ;
          //不正常现象
          if(totalPage<=continues){
              start = 1;
              end = totalPage;
          }else{
              //正常现象
              start = pageNo - parseInt(continues/2)
              end = pageNo + parseInt(continues/2)
              //特殊情况
              if(start<1){
                  start = 1;
                  end = continues;
              }
                if(end>totalPage){
                  start = totalPage-continues+1
                  end = totalPage
              }
          }
          return {start,end}
      },
      //计算出有多少页
      totalPage(){
          return Math.ceil(this.total/this.pageSize)
      }
  }
};
</script>

<style lang="less" scoped>
</style>