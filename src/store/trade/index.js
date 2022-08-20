import {reqAddressInfo,reqOrderInfo} from '@/api';
const state ={
    address:[],
    orderInfo:{}
};
const mutations ={
    USERADDRESS(state,address){
        state.address = address
    },
    ORDERINFO(state,orderInfo){
        state.orderInfo= orderInfo
    }
};
const actions ={
    //获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo()
        // console.log(result);
        if(result.code==200){
            commit('USERADDRESS',result.data)
            return 'ok'
        }else{
            return Promise.reject(new error('fail'))
        }
        
    },
    //获取商品清单数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code==200){
            commit('ORDERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new error('fail'))
        }
    }

};
const getters ={

};

export default {
    state,
    mutations,
    actions,
    getters
}