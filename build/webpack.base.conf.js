'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpackConfig = require('../config/prod.webpack')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: utils.entries(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: webpackConfig.resolvesConfig,
  module: webpackConfig.modulesConfig,
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
