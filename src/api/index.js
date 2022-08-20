//当前这个模块：api进行统一管理
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList  get请求  无参数
//发请求：axios返回的是promise对象
export const reqCategoryList = () => requests({
    url:'/product/getBaseCategoryList',
    method:'get'
})

//获取banner（home首页轮播图参数）
export const reqGetBannerList= () => mockRequests({
    url:'/banner',
    method: 'get'
})

//获取floor的数据
export const reqGetFloorList =() => mockRequests({
    url:'/floor',
    method:'get'
})

//获取搜索数据模块  地址 /api/list  post请求  参数：需要带参数
// {
//     "category1Id": "61",//一级分类的id
//     "category2Id": "61",//二级分类的id
//     "category3Id": "61",//三级分类的id
//     "categoryName": "手机",//产品的名字
//     "keyword": "小米",//关键字
//     "order": "1:desc",//排序
//     "pageNo": 1,//当前第几页
//     "pageSize": 10,//每一页需要展示多少条数据
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],//平台属性的选择参数
//     "trademark": "4:小米"//品牌参数
//   }
export const reqGetSearchInfo = (params) => requests({
    url:'/list',
    method:'post',
    //搜索的接口，需要传递参数，至少是一个空对象
    data: params
})
  
//获取商品详情的数据  地址：/api/item/{ skuId }  get请求  参数：必须携带参数
export const reqGetDetailInfo = (skuId) =>requests({
    url:`/item/${skuId}`,
    method:'get'
})

//把产品添加到购物车中（获取某一个更新的产品个数） post请求  参数：skuId,skuNum都是必须携带的 
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqGetOrUpdateShopCart =(skuId,skuNum)=>requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

//获取购物车的数据
//get请求 /api/cart/cartList 
export const reqCartList = ()=>requests({
    url:'/cart/cartList',
    method:'get'
})
//删除购物车的数据
//delete请求 /api/cart/deleteCart/{skuId}  
export const reqDeleteCartById = (skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})

//修改商品isChenked属性
//  /api/cart/checkCart/{skuID}/{isChecked}  get请求
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

//获取验证码
///api/user/passport/sendCode/{phone}  get请求
export const reqGetCaptcha = (phone) => requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})

//注册用户
///api/user/passport/register  参数{phone,code,password}
export const reqUserRegister =(data) =>requests({
    url:'/user/passport/register',
    method:'post',
    data
})

//登录
// /api/user/passport/login post请求  参数phone，password
export const reqLogin = (login) =>requests({
    url:'/user/passport/login',
    method:'post',
    data:login
})

//获取用户的信息（需要带着用户的token）
///api/user/passport/auth/getUserInfo  
export const reqGetUserInfo = () =>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

//退出登录
// /api/user/passport/logout  get请求 
export const reqLogout =() =>requests({
    url:'/user/passport/logout',
    method:'get'
})

//获取用户地址信息
//  /api/user/userAddress/auth/findUserAddressList  get请求
export const reqAddressInfo=() =>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

//获取商品清单
//  /api/order/auth/trade  get请求
export const reqOrderInfo=() =>requests({
    url:'/order/auth/trade',
    method:'get'
})

//提交订单的接口
//  /api/order/auth/submitOrder?tradeNo={tradeNo}  post请求
export const reqSubmitOrder =(tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})

// 获取订单支付信息
//  /api/payment/weixin/createNative/{orderId}  get请求
export const reqPayInfo =(orderId) => requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

//获取支付订单状态
//   /api/payment/weixin/queryPayStatus/{orderId}  get请求
export const reqPayStatus =(orderId) => requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

//获取个人中心的订单数据
//  /api/order/auth/{page}/{limit}  get请求
export const reqMyOrderList =(page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})
