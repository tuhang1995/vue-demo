const path = require('path');

module.exports = {
    publicPath: './',
    outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist',
    css: {
        loaderOptions: {
            stylus: {
                //全局引入的css  一些通用变量
                // import: '~@/common/css/minxis.styl'
            }
        }
    },
    lintOnSave: false,
    productionSourceMap: true,
    devServer: {
        port: 3000,
        open: true,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        },
    },
    configureWebpack: { // 覆盖webpack默认配置的都在这里
        resolve: { // 配置解析别名
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@a': path.resolve(__dirname, './src/assets'),
                '@s': path.resolve(__dirname, './src/assets/style'),
                '@i': path.resolve(__dirname, './src/assets/images'),
            }
        }
    }
}