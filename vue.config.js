const path = require('path');

module.exports = {
    publicPath: './',
    outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist',
    css: {
        loaderOptions: {
            stylus: {
                //全局引入的css  一些通用变量
                import: '~@/common/css/minxis.styl'
            }
        }
    },
    lintOnSave: false,
    productionSourceMap: true,
    // devServer: {
    //     port: 3000,
    //     host: "0.0.0.0",
    //     // ws: false,
    //     //为了解决项目一直报sockjs-node 404 
    //     sockHost: 'http://192.168.0.54:3000',
    //     proxy: {
    //         "/api": {
    //             target: "http://192.168.0.54:3000",
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 "^/api": ""
    //             }
    //         }
    //     },
    //     // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    //     overlay: {
    //         warnings: false,
    //         errors: true
    //     }
    // },
    configureWebpack: { // 覆盖webpack默认配置的都在这里
        resolve: { // 配置解析别名
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@a': path.resolve(__dirname, './src/assets'),
                '@s': path.resolve(__dirname, './src/assets/style'),
                '@i': path.resolve(__dirname, './src/assets/images'),
            }
        }

    },
    // assetsDir: "static",  项目打包后文件放入static(css/js/image)文件内
    //处理视频直播
    chainWebpack: config => {
        config.module
            .rule('swf')
            .test(/\.swf$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 10000
            })
    }
}