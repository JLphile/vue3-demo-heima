# 一、webpack的基本使用

## 1.功能

1. 代码压缩混淆
2. 处理浏览器JavaScript的兼容性
3. 性能优化

## 2.创建列表隔行变色项目

1. 新建项目空白目录，并运行 npm init -y命令，初始化包管理配置文件 package.json
2. 新建src源代码目录
3. 新建 src->index.html首页和src->index.js脚本文件
4. 初始化首页基本结构
5. 运行 npm install jquery -s命令，安装jQuery
6. 通过ES6模块化的方式导入jQuery，实现列表隔行变色效果

## 3.在项目中安装webpack

在终端运行如下的命令，安装webpack相关的两个包

```cmd
npm install webpack webpack-cli -D
```

## 4.在项目中配置webpack

1.在项目根目录中，创建webpack.config.js的webpack配置文件，并初始化如下的基本配置：

```javascript
//webpack.config.js
module.exports={
    mode:'development' //mode用来指定构建模式，可选值有development和production
}
```
2.在package.json的scripts节点下，新增dev脚本如下：
```javascript
//package.json
//script 节点下的脚本，可以通过npm run 执行，例如npm run dev
{
"scripts": {
    "dev": "webpack"
  }
}
```

### 4.1 mode的可选值

mode节点的可选值有两个，分别是：

**1.development** 

- 开发环境

- 不会对打包生成的文件进行代码压缩和性能优化
- 打包速度快，适合在开发阶段使用

**2.production**

-  生产环境
-  会对打包生成的文件进行代码压缩和性能优化
-   打包速度很慢，仅适合在项目发布阶段使用

### 4.2 webpack.config.js文件的作用

webpack.config.js是webpack的配置文件。webpack在真正开始打包构建之前，会先读取这个配置文件，从而基于给定的配置，对项目进行打包。

**注意：**由于webpack是基于node.js开发出来的打包工具，因此在它的配置文件中，支持使用node.js相关的语法和模块进行webpack的个性化配置。

### 4.3 webpack中的默认约定

在webpack中的如下约定：

1. 默认的打包入口文件为src->index.js

2. 默认的输出文件路径为dist->main.js

   **注意：**可以在webpack.config.js中修改打包的默认约定

   

### 4.4  自定义打包的入口和出口

在webpack.config.js配置文件中，通过 entry 节点指定打包的入口。通过output节点指定打包的出口。

示例代码如下：

```javascript
//webpack.config.js

const path = require('path')

module.exports = {
  mode: 'development',
  //指定打包的入口
  entry: path.join(__dirname, './src/index.js'),
  //指定打包的出口
  output: {
    // 输出文件的存放路径
    path: path.join(__dirname, './dist'),
    // 输出文件的名称
    filename: 'bundle.js',
  },
}
```

# 二 webpack中的插件

## 1. webpack插件的作用

通过安装和配置第三方的插件，可以拓展 webpack 的能力，从而让 webpack 用起来更方便。最常用的 webpack 插件有如下两个：

  ### 1.1.webpack-dev-sever

- 类似于 node.js 阶段用的 nodemon 工具

- 每当修改了源代码，webpack会自动进行项目的打包和构建

### 1.2.html-webpack-plugin

- webpack中的HTML插件（类似于一个模板引擎插件）

- 可以通过此插件自定义index.html页面的内容

  

  

## 2.  webpack-dev-server

### 2.1 安装 webpack-dev-sever

运行如下的命令，即可在项目中安装此插件：		

```cmd
npm install webpack-dev-server -D
```



### 2.2 配置 webpack-dev-server

2.2.1 修改 package.json->中的dev命令如下：

```javascript
{
"scripts": {
    "dev": "webpack serve"
  }  
}
```

再次运行 npm run dev 命令，重新进行项目的打包

在浏览器中访问 http://localhost:8080地址，查看自动打包效果

**注意：**webpack-dev-server会启动一个实时打包的http服务器



在webpack.config.js文件中添加

```javascript
devServer:{
        static:{
            directory:path.join(__dirname,'/')
       }
    }
```
