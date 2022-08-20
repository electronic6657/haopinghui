import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串，且每次执行不可发生变化，游客身份持久化存储
//单例模式
export const getUUID=()=>{
    //先从本地存储看uuid是否存在
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有
    if(!uuid_token){
        //生成随机游客临时身份
        uuid_token=uuidv4()
        //存到localStorage中一次    
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}