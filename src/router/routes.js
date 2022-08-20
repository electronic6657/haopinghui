//引入路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default  [
    
        {
            path: "/home",
            component:Home,
            meta:{show:true}
        },
        {
            path: "/login",
            component:Login,
            meta:{show:false}
        },
        {
            path: "/search/:keyword?",
            component:Search,
            meta:{show:true},
            name:"search",
            //路由组件能不能传递props数据？
            //布尔值写法（只能传params）
            // props:true
            //对象写法(额外的给路由组件传递一些props)
            // props:{a:1,b:2}
            //函数写法：可以params参数、query参数，通过props传递给路由组件
            // props:($route)=>{
            //     return {keyword:$route.params.keyword,k:$route.query.k}
            // }
            props:($route) =>({keyword:$route.params.keyword,k:$route.query.k})
        },
        {
            path: "/register",
            component:Register,
            meta:{show:false}
        },
        //需要传商品id，使用params需要占位符，？表示可有可没有
        {
            path: "/detail/:skuId?",
            component:Detail,
            meta:{show:true}
        },
        //加入购物车成功页面
        {
            path: "/addcartsuccess",
            component:AddCartSuccess,
            name: "addcartsuccess",
            meta:{show:true}
        },
        //购物车页面
        {
            path: "/shopcart",
            component:ShopCart,
            name: "shopcart",
            meta:{show:true}
        },
        //订单页面
        {
            path: "/trade",
            component: () => import('@/pages/Trade'),
            name: "trade",
            meta:{show:true},
            //路由独享守卫
            beforeEnter:(to,from,next) =>{
                if(from.path=='/shopcart'){
                    next();
                }else{
                    //如果浏览器的url改变了，url会重置到from路由对应的地址，停留在当前页
                    next(false)
                }
            }
        },
        //订单付款页面
        {
            path: "/pay",
            component: () => import('@/pages/Pay'),
            name: "pay",
            meta:{show:true},
            //路由独享守卫
            beforeEnter:(to,from,next) =>{
                if(from.path=='/trade' || from.path=='/pay'){
                    next();
                }else{
                    //如果浏览器的url改变了，url会重置到from路由对应的地址，停留在当前页
                    next(false)
                }
            }
        },
        //付款成功页面
        {
            path: "/paysuccess",
            component: () => import('@/pages/PaySuccess'),
            name: "paysuccess",
            meta:{show:true},
            beforeEnter:(to,from,next) =>{
                if(from.path=='/pay'){
                    next();
                }else{
                    //如果浏览器的url改变了，url会重置到from路由对应的地址，停留在当前页
                    next(false)
                }
            }
        },
        //个人中心页面
        {
            path: "/center",
            component: () => import('@/pages/Center'),
            name: "center",
            meta:{show:true},
            //二级路由组件
            children:[
                {
                    path:'myorder',
                    component:MyOrder,
                },
                {
                    path:'grouporder',
                    component:GroupOrder,
                },
                //重定向
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },
    
        //路由重定向
        {
            path:"/",
            redirect:"/home"
        }

    
]