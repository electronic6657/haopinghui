//detail模块仓库
import {reqGetDetailInfo,reqGetOrUpdateShopCart} from '@/api'
//封装游客身份模块uuid--生成一个随机字符串（不能改变）
import {getUUID} from '@/utils/uuid_token'
const state ={
    detailList:{},
    //游客身份
    uuid_token:getUUID()
};
const mutations={
    DETAILLIST(state,detailList){
        state.detailList=detailList
    }
};
const actions={
    //获取detail页面的数据
    async getDetailInfo({commit},skuId){
        let result = await reqGetDetailInfo(skuId)
        // console.log(result);
        
        if(result.code==200){
            commit('DETAILLIST',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //服务器写入数据后，并没有返回其他的数据，只是返回code=200，代表这次操作成功了
        //因为服务器没有返回其余数据，所以不需要三连环存储数据
        let result = await reqGetOrUpdateShopCart(skuId,skuNum)
        // console.log(result);
        //代表服务器加入购物车成功
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
        
    }
};
//简化数据
const getters ={
    //面包屑位置的数据（商品路径）
    categoryView(state){
        //如果网络不好没有数据至少给一个空对象，解决报错
        return state.detailList.categoryView ||{}
    },
    //商品标题的数据
    skuInfo(state){
        return state.detailList.skuInfo || {}
    },
    //商品属性的数据
    spuSaleAttrList(state){
        return state.detailList.spuSaleAttrList || []
    }

};

export default{
    state,
    mutations,
    actions,
    getters
}