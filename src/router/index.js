//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
import routes from './routes'


//引入仓库
import store from '@/store'

//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve && reject){
        //call||apply区别:相同点，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        //call、apply、bind都是用来改变this指向的
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,() => {},() => {})
    }
}
VueRouter.prototype.replace = function (location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,() => {},() => {})
    }
}

//配置路由
let router =  new VueRouter({
    routes,
    //滚动行为，控制路由跳转后，页面初始在哪一个位置，解决了跳转后详情页不是在最上面的问题
    scrollBehavior (to, from, savedPosition) {
         return {y:0}
      }
});

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
    //to:可以获取到你要跳转到哪个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数  next()放行  
    //next('/login') 放行到指定的路由  next(false)
    //用户登陆了，才会有token，未登录一定不会有token
    let token = localStorage.getItem('token')
    //获取用户信息中的名字，为什么要获取名字，因为用户信息是一个对象，空对象在判断是真，影响结果
    let name = store.state.user.userInfo.name
    //用户登录了
    if(token){
        //如果用户登录了还想去login（不能去，停留在当前页）
        if(to.path=='/login'){
            next('/');
        }else{
            //如果用户名已经有了，就放行
            if(name){
                // console.log(222);
                
                next();
            }else{
                try {
                    //如果没有，就派发action让仓库存储用户信息在跳转
                    await store.dispatch('getUserInfo');
                    // console.log(333)
                    next();
                } catch (error) {
                    //token失效了，获取不到用户信息，把之前存储的token清空，重新登录
                    await store.dispatch('userLogout');
                    //跳转到登录页
                    next('/login');
                    // alert(error.message)
                }
                
            }
        }
    }else{
        //未登录：不能去交易相关，不能去pay|pasysuccess，不能去个人中心，跳转到登录页
        //去的不是上面这些路由，放行
        let toPath = to.path;
        //if (['pay', 'trade', ].every(item=>!to.path.includes(item)))
        if(toPath.indexOf('/trade')!=-1 || toPath.includes('/pay')==true || toPath.includes('/center')==true){
            //把未登录的时候没有去成的信息，存储在地址栏中【路由】
            next('/login?redirect='+toPath);
        }else{
            next();
        }
        
    }

})


export default router;