//home模块的小仓库
import {reqCategoryList} from '@/api'
import {reqGetBannerList,reqGetFloorList} from '@/api'
const state ={
    //state中数据默认初始值别乱写，根据接口返回值初始化的
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations={
    
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList=floorList
    }
};
const actions ={
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
    async categoryList({commit}){
        let result =  await reqCategoryList()
        if(result.code==200){
            commit('CATEGORYLIST',result.data)
        }
        
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result =  await reqGetBannerList()
        // console.log(result);
        if(result.code==200){
            commit('BANNERLIST',result.data)
        }
        
    },
    //获取Floor的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code==200){
            commit('FLOORLIST',result.data)
        }
    }
};
const getters ={};

export default{
    state,
    mutations,
    actions,
    getters
}