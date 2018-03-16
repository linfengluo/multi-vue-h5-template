# multi-vue-h5

> 移动端vw多页面适配方案

在看了大漠大大的[分享手淘过年项目中采用到的前端技术](https://www.w3cplus.com/css/taobao-2018-year.html)和[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)的讲解后，动手折腾了这个多页面的VW适配（支持vue-router）。

[Demo](http://image.luolinfeng.com/vue-mutil-h5.png)： 
![demo](http://image.luolinfeng.com/vue-mutil-h5.png)

# 特点
* 基于vue-cli
* 多页面 or 单页面
* VW布局
* 支持DLLplugins

# 目录
``` bash
|--build                  # webpack
|--config                 # 配置文件
|--dist                   # 编译输入目录
   |--js
   |--css
   index.html             # 根据pages中的目录名生成对应的html
   ...morePage.html
|--src                    # 开发目录
   |--assets
   |--components          # 公用组件
   |--pages               # 页面
      |--index            # 默认首页（编译后的文件将根据该目录名生成）
      |--……morePage
   |--scss                # sass目录
   |--units               # 公用js
      |--libs
|--static                 #静态文件
.babelrc
.eslintignore
.postcssrc.js
manifest.json
package.json
README.md
```

# 使用vw

```bash
# 全局注册component

import radioDiv from '../../components/radioDiv.vue'
Vue.component('radioDiv', radioDiv)
```

``` bash
# 在使用宽高比布局时，请务必使用radioDiv包裹
<template>
  <radioDiv class="test">
    demo
  </radioDiv>
</template>


<style lang="scss" rel="stylesheet/scss">
  @import "../scss/vw";
  .test{
      #aspect-ratio(宽度px， 宽度比例， 高度比例)
    @include aspect-ratio(750 / 2, 1, 1)
  }
</style>
```

# DLL配置
开启dll打包可以提高编译速度，同时可以更好的利用缓存
```bash
配置目录：./config/dll.conf.js

const path = require('path')
const fileName  = 'vendor_dll'    #文件名
const dllProdName = require(`../src/units/libs/${fileName}.json`)   #记录文件hash
module.exports = {
  isUsed: true,             #是否开启DllPlugins
  fileName: fileName,       #文件名 
  devPath: path.resolve(__dirname, '../src/units/libs'),    #保存目录
  filepath: path.resolve(__dirname, `../src/units/libs/${dllProdName[fileName].js}`),   #文件路径
  outputPath: 'js',     #输出目录
  publicPath: '/js/',   #文件路径
  vendor: [             #打包的插件列表
    'vue',
    'vue-router'
  ]
}
```

# 开发命令

``` bash
npm install                 # 安装依赖
npm run dev                 # 开发环境
npm run build:dll           # 打包dll
npm run build               # 生产环境(开启dll请务必先打包dll)
```

# 注意
* PC端会出现滚动，如需保证PC布局，请隐藏浏览器滚动条（```::-webkit-scrollbar{width:0}```）
* 如需兼容iPhone X，请添加 ```<meta name="viewport" content="...,viewport-fit=cover">```


# 参考
* [如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
* [webpack进阶——DllPlugin优化打包性能（基于vue-cli）](http://blog.csdn.net/u011649976/article/details/77076212)
* [关于vue项目多页面的配置](https://www.jianshu.com/p/acbff04b4096)