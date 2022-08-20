//shopCart模块仓库
import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'
const state ={
    cartList:[]
};
const mutations ={
    CARTLIST(state,cartList){
        state.cartList=cartList
    }
};
const actions ={
    //获取购物车数据
    async getCartList({commit}){
        let result = await reqCartList()
        // console.log(result);
        
        if(result.code==200){
            commit('CARTLIST',result.data)
        }
    },
    //删除购物车数据
    async deleteCartById({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        // console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //修改商品isChencked属性
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //删除所有的勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        
        let PromiseAll =[];
        //获取购物车中的全部的产品，是一个数组
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1 ? dispatch('deleteCartById',item.skuId):'';
            //将每一次返回的promise添加到数组当中
            PromiseAll.push(promise)
        });
        //只要全部的p1|p2...都成功，返回结果即为成功
        //如果有一个失败，返回即为结果失败
        return Promise.all(PromiseAll)
    },
    //全选操作
    updateAllCartIsChecked({dispatch,getters},isChecked){
        //根据传过来的isChecked可以知道全选按钮是1还是0，是1就把全部商品的isChecked遍历出来赋值1，是0也一样操作
        let promiseAll =[];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
};
const getters ={
    cartList(state){
        return state.cartList[0] ||{}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}