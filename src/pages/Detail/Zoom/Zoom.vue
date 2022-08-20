<template>
  <div class="spec-preview">
    <img :src="skuImageList[index].imgUrl"  />
    <div class="event" @mousemove="hander" ref="eventDom"></div>
    <div class="big">
      <img :src="skuImageList[index].imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    //接受父组件传来的数据
    data(){
      return {
        index : 0
      }
    },
    props:{
      skuImageList:{
        //类型
        type:Array,
        //默认值
        //如果只是设置为[]，空数组的第0项没有imgUrl属性，还是会报错，所有里面包裹一个空对象
        default: function (){
         return [{}]
        } 
      }
    },
    mounted(){
      //全局事件总线
      this.$bus.$on('getIndex',(index)=>{
        //赋值给data中的index
        this.index=index
      })
    },
    methods:{
      hander(event){
        // console.log(event);
        let mask  = this.$refs.mask
        let eventDom = this.$refs.eventDom
        let big = this.$refs.big
        let left = event.offsetX-mask.offsetWidth/2
        let top = event.offsetY-mask.offsetHeight/2
        //约束范围
        if(left<=0) left=0
        //因为mask宽度刚好是父元素的二分之一，所以可以这样写
        // if(left>=mask.offsetWidth) left=mask.offsetWidth
        //通用写法
        if(left>=eventDom.offsetWidth-mask.offsetWidth) left=eventDom.offsetWidth-mask.offsetWidth
        if(top<=0) top=0
        if(top>=mask.offsetHeight) top=mask.offsetHeight
        // if(top>=eventDom.offsetHeight-mask.offsetHeight) top=eventDom.offsetHeight-mask.offsetHeight
        //修改元素的left和top值
        mask.style.left=left+'px'
        mask.style.top=top+'px'
        big.style.left=-2*left+'px'
        big.style.top=-2*top+'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>