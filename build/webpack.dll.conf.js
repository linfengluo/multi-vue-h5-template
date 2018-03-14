/**
 * Created by linfengluo@gmail.com on 2018/3/13.
 */

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const webpackConfig = require('../config/prod.webpack')
const dllConfigs = require('../config/dll.conf')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  output: {
    path: dllConfigs.devPath,
    filename: '[name].[hash:8].js',
    library: '[name]_libs', // 注意与DllPlugin的name参数保持一致 [name]为entry的key
  },
  entry: {
    [dllConfigs.fileName]: dllConfigs.vendor
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: 'manifest.json', // DllReferencePlugin使用
      name: '[name]_libs',  // 确保output.library一致
      context: __dirname, // 建议设置为项目根目录
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new AssetsPlugin({
      filename: `${dllConfigs.fileName}.json`,
      path: dllConfigs.devPath
    }),
    new ExtractTextPlugin('[name].[hash:8].css'),
  ],
  resolve: webpackConfig.resolvesConfig,
  module: webpackConfig.modulesConfig,
};
