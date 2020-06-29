let path = require('path');

module.exports = {
    productionSourceMap: false,
    filenameHashing: false,
    chainWebpack: config => {
        config.plugin('copy').tap(([options]) => {
            options.push({from: path.resolve(__dirname, 'src/db/json'), to: path.resolve(options[0].to, 'db'), flatten: true, toType: 'dir'})
            return [options]
        })
    }
};