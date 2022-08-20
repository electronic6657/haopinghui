import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

//注册全局组件三级联动
import TypeNav from '@/components/TypeNav'
//全局组件：第一个参数 组件名字 第二个参数：那个组件
Vue.component(TypeNav.name,TypeNav)
//注册全局组件分页器
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name,Pagination)

//分页器练习
import Pagination1 from '@/components/Pagination1';
Vue.component(Pagination1.name,Pagination1)

//引入MockServe.js ----mock数据
import '@/mock/mockServe'

//引入swiper样式
import "swiper/css/swiper.css"

//引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//测试
// import {reqCategoryList} from '@/api';
// reqCategoryList();

//引入vue-lazyload
import VueLazyload from 'vue-lazyload';
import logo from '@/assets/logo.png';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: logo,//失败对应的图片
  loading: logo,//懒加载默认对应的图片
  // attempt: 1
})

//统一api接口文件里面的所有请求函数
//统一引入
import * as API from '@/api';



//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name: 'upper'
});

//引入表单校验插件
import '@/plugins/validate';

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  //注册路由，当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库，组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
