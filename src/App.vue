<template>
  <div>
    <Header></Header>
    <!-- 设置路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 简单不常用方案，在home、search显示footer -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>


<script>
import Header from './components/Header'
import Footer from './components/Footer'
  export default {
    name:"",
    components:{
      Header,
      Footer
    },
  data() {
    return {
      msg: 'abc'
    }
  },
  }
</script>

<style lang="less" scoped>

</style>