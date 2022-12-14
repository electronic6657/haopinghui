module.exports = {
    //取消eslint
    lintOnSave: false,
    //打包时不要map文件
    productionSourceMap:false,
    //代理跨域
    devServer: {
        proxy: {
            //当请求地址含有api字段的请求时，往target进行请求，此处并不需要重写api字段，因为接口地址都包含api字段
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' },
            }
        }
    }
}