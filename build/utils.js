'use strict'
const path = require('path')
const config = require('../config')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const entriePaths = getEntries()
const HtmlWebpackPlugin = require("html-webpack-plugin-for-multihtml")
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const dllConfigs = require('../config/dll.conf')


exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.entries = () => {
  return entriePaths.extries
}

exports.htmlPlugins = function() {
  let templatePaths = entriePaths.templates
  let arr = []
  arr.push(new AddAssetHtmlPlugin([
    {
      filepath: path.resolve(__dirname, '../src/units/libs/viewport-units-buggyfill.min.v062.js'),
      outputPath: dllConfigs.outputPath,
      publicPath: dllConfigs.publicPath,
      includeSourcemap: false
    }
  ]))
  templatePaths.map(template => {
    let chunkName = template.split(path.sep).slice(-2)[0];
    arr.push(new HtmlWebpackPlugin({
      filename: chunkName + '.html',
      template: template,
      chunks: ['vendor', 'manifest', chunkName],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }))
  })

  if (dllConfigs.isUsed && process.env.NODE_ENV === 'production') {
    arr.push(new AddAssetHtmlPlugin([
      {
        filepath: dllConfigs.filepath,
        outputPath: dllConfigs.outputPath,
        publicPath: dllConfigs.publicPath,
        includeSourcemap: false
      }
    ]))
  }

  return arr
}


function getPath(...args) {
  return path.join(path.resolve(__dirname, '../src'), ...args);
}

/*
* 获取页面入口
* */
function getEntries() {
  const files = glob.sync(`${config.base.pagesRoot}/*/*.js`)
  let extries = {}
  let templates = []

  files.forEach(function(filePath) {
    let fileSplits = filePath.split('/');
    const length = fileSplits.length
    const folderName = fileSplits[length - 2]
    const fileName = fileSplits[length - 1]

    extries[folderName] = getPath('pages', folderName, fileName)
    templates.push(getPath('pages', folderName, 'index.html'))
  })

  return {
    extries: extries,
    templates: templates
  }
}
