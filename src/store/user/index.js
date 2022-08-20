//登录注册模块
import {reqGetCaptcha,reqUserRegister,reqLogin,reqGetUserInfo,reqLogout} from '@/api'
const state ={
    captchaCode:'',
    token:'',
    userInfo:{}
};
const mutations={
    CAPTCHA(state,captcha){
        state.captchaCode=captcha
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    //清除数据
    CLEAR(state){
        state.token= '',
        state.userInfo='',
        //清除本地存储中的token
        localStorage.removeItem('token')
    }
};
const actions={
    //获取验证码
    async getCaptcha({commit},phone){
        let result = await reqGetCaptcha(phone)
        // console.log(result);
        
        if(result.code==200){
            commit('CAPTCHA',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //注册用户
    async userRegister({commit},user){
        //修改一下参数名称，不然请求的参数名称不对
        let data= {};
        data.phone = user.phone;
        data.code=user.captcha;
        data.password = user.password1
        let result = await reqUserRegister(data)
        // console.log(result)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //用户登录
    async userLogin({commit},user){
        let result =await reqLogin(user)
        // console.log(result);
        if(result.code==200){
            //将token放在本地存储中
            localStorage.setItem('token',result.data.token)
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        // console.log(result);
        if(result.code==200){
            commit('USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //退出登录
    async userLogout ({commit}){
        let result = await reqLogout()
        // console.log(result);
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        } 
    }
};
const getters={

};
export default {
    state,
    mutations,
    actions,
    getters
}