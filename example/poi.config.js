const path = require('path')

exports.entry = 'example/index'

exports.configureWebpack = {
  resolve: {
    alias: {
      'vue-html$': path.join(__dirname, '../src')
    }
  }
}
