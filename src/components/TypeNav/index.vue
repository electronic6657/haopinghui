<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <!-- 事件委派，事件委托 -->
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
        <div class="sort" v-show="this.show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1,index) in categoryList"
              :key="c1.categoryId"
              :class="{cur:currentIndex==index}"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  href="javascript:"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >{{c1.categoryName}}</a>
              </h3>
              <div
                class="item-list clearfix"
                :style="{display:currentIndex==index ? 'block':'none'}"
              >
                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a
                        href="javascript:"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入方式：是把lodash全部功能引入
// import _ from 'lodash'
//最好的引入方式，按需引入
//节流
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上哪一个一级分类
      currentIndex: -2,
      show: true
    };
  },
  mounted() {
     //通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList").once;
    //如果不是home组件，将TypeNav隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList.splice(0, 16)
    })
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   //index：鼠标移上某一个一级分类的元素的索引值
    //   // console.log(index)
    //   this.currentIndex = index;

    // },
    //throttle回调函数别用箭头函数
    changeIndex: throttle(function(index) {
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标移出的事件回调
    leaveIndex() {
      this.currentIndex = -1;
      //要判断不是在home组件的时候才隐藏
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方案，编程式导航 + 事件委派
      //存在一些问题：事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父节点
      //点击a标签的时候才会进行路由跳转，怎么才能确定点击的一定是a标签
      //即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签
      //利用event获取点击的是哪一个标签
      let element = event.target;
      // console.log(element);
      //获取到当前出发这个事件的节点，需要带有自定义标签data-categoryname
      //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
      //自定义属性小写categoryname
      //结构赋值
      let {
        categoryname,
        category1id,
        category2id,
        category3id
      } = element.dataset;
      if (categoryname) {
        //整理理由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类，二级分类，三级分类的a标签
        if (category1id) {
          // this.$router.push({name:'search',query:{categoryName:categoryname,category1Id:category1id}})
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //整理完参数
        //如果有params参数，也要携带过去
        if(this.$route.params){
          location.params=this.$route.params
        }
        location.query = query;
        //路由跳转
        this.$router.push(location);
        
      }
    },
    //鼠标移入的回调函数
    enterShow() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间，速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
.cur {
  background-color: skyblue;
}
</style>