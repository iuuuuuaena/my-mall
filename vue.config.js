module.exports = {
    //基本路径
    publicPath: "./",
    //outputDir: "dist", 构建时输出目录 默认dist
    //放置静态资源目录
    assetsDir: "static",
    //indexPath: "index.html", html输出路径 默认 index.html

    devServer: {
        open: true,
        host: '39.100.92.163',
        port: 80,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {  //配置跨域
            '/api': { // 当遇到'/api'的时候
                target: `http://121.89.208.41:8080`, // 需要将目前的地址代理至target
                changeOrigin: true,
                pathRewrite: {
                    ['^' + '/api']: '' // 将'/api' 重写为''
                },
                // '/api': {
                //     target: 'http://121.89.208.41:8080',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                //     ws: true,
                //     changOrigin: true,  //允许跨域
                //     pathRewrite: {
                //         '^/api': ''  //请求的时候使用这个api就可以
                //     }
                // }
            }

        }

    }
}