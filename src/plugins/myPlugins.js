//vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,options){
    //自定义指令
    Vue.directive(options.name,(element,params)=>{
        //变大写
        element.innerHTML = params.value.toUpperCase();
    })
    
}

export default myPlugins;