const path = require('path')

// const defaultSetting = require('./src/setting')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {

//   configureWebpack: {
//     name: 'v-admin',
//     resolve: {
//       alias: {
//         '@': resolve('src')
//       }
//     }
//   },

  chainWebpack(config) {
    //set svg-sprite-loader-mod
    config.module
      .rule('svg-sprite')
      .test(/\.(svg)(\?.*)?$/)
      .include
      .add(resolve('src/icon'))
      .end()
      .use('svg-sprite-loader-mod')
      .loader('svg-sprite-loader-mod')
      .options({
        extract: false,
        symbolId: 'icon-[name]'
      }).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]}))
      .end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(resolve('src/icon'))

  }
}

