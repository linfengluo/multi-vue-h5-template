/**
 * Created by linfengluo@gmail.com on 2018/3/13.
 */
const path = require('path')
const fileName  = 'vendor_dll'
const dllProdName = require(`../src/units/libs/${fileName}.json`)
module.exports = {
  isUsed: true, //是否开启DllPlugins
  fileName: fileName,
  devPath: path.resolve(__dirname, '../src/units/libs'),
  filepath: path.resolve(__dirname, `../src/units/libs/${dllProdName[fileName].js}`),
  outputPath: 'js',
  publicPath: '/js/',
  vendor: [
    'vue',
    'vue-router'
  ]
}
