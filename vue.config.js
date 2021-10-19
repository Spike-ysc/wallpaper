const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {

    devServer: {
        port: 8080,
    },
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        externals: {
            'vue': 'Vue',
            'element-ui': 'ELEMENT'
        }

    },

}