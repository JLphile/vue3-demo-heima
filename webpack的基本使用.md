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

**小技巧：**为了在编写webpack.cofig.js 配置文件的时候可以有代码提示，我们可以把这样一行代码放到导出语句之前

```javascript
//webpack.config.js
/**
 * @type {import('webpack').Configuration}
 */

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
    
  //指定打包的入口,一般是一个字符串，写一个相对路径就可以了
  // entry: path.join(__dirname, './src/index.js'),
  entry: './src/index.js',
    
  //指定打包的出口
  output: {
    // 输出文件的存放路径
    path: path.join(__dirname, './dist'),
    // 输出文件的名称
    filename: 'bundle.js',
  },
    
}
```

# 二 、webpack中的插件

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
module.exports = {  
  // 服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },  
  },
}
```

### 2.3 打包生成的文件去哪了？

 **2.3.1** 不配置webpack-dev-server 的情况下，webpack打包生成的文件，会存放到实际的物理磁盘上

- 严格遵守开发者在webpack.config.js 中指定配置
- 根据output 节点指定路径进行存放

**2.3.2** 配置了 webpack-dev-sever之后，打包生成的文件存放在了内存中

- 不再根据output 节点指定的路径，存放到实际的物理磁盘上
- 提高了实时打包输出的性能，因为内存比物理磁盘速度快很多

**2.3.4**生成到内存中的文件该如何访问？

webpack-dev-sever 生成到内存中的文件，默认放到了项目的根目录中，而且是虚拟的、不可见的。

**验证代码：**

```html
//index.html
<!DOCTYPE html>
<html lang="en">
  <head>
   ...
    <!-- 从根目录下引入 -->
    <script src="/bundle.js"></script>
  </head>
  <body>
    ...
  </body>
</html>

```



## 3. html-webpack-plugin

html-webpack-plugin 是webpack 中的	HTML 插件，可以通过此插件自定制 index.html 页面的内容。

**需求：**通过 html-webpack-plugin 插件，将src目录下的index.html 首页，复制到项目根目录中一份！

### 3.1 安装 html-webpack-plugin 插件

运行如下的命令，即可子啊项目中安装此插件：

```cmd
npm install html-webpack-plugin -D
```

### 3.2 配置  html-webpack-plugin

```javascript
//webpack.config.js
//1.导入HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')

//2.创建HTML 插件的实例对象
const htmlPlugin =new HtmlPlugin({
  template:'./src/index.html',//指定原文件的存放路径
  filename:'./index.html',//指定生成的文件的存放路径
})

modul.exports = {
  mode:'development',
  plugins:[htmlPlugin],//3.通过 plugins 节点，挂载实例对象 htmlPlugin ，从而使 htmlPlugin 插件生效
}
```

### 3.3 解惑  html-webpack-plugin 

3.3.1 通过HTML 插件复制到根目录中的 index.html 页面，也被放到了内存中

3.3.2 HTML 插件在生成的 index.html 页面中，自动注入了打包的bundle.js 文件

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    //此处自动注入了 bundle.js 文件
  <script defer src="bundle.js"></script>
  </head>
  <body>
    ...
  </body>
</html>

```



## 4. devServer 节点

在webpack.config.js 配置文件中，可以通过 devServer 节点对 webpack-dev-server 插件进行更多的配置：

```javascript
module.exports = {
  
  // 服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    open: true, //初次打包完成后，自动打开浏览器
    host: '127.0.0.1', //实时打包所使用的主机地址
    port: 8080, //实时打包所使用的端口号
  },
  ...
}

```

# 三 、webpack 中的loader

## 1. loader 概述

在实际的开发中，webpack默认只能打包处理.js后缀名的模块，其他的非.js结尾的模块如.css不能处理，这个时候，就要使用loader加载器来进行打包

loader加载器的作用 ： `协助webpack打包处理指定的文件模块`

- css-loader ： 可以打包处理.css相关的文件
- less-loader ： 可以打包处理.less相关的文件
- babel-loader ： 可以打包处理webpack无法处理的高级JS语法

## 2. loader的调用过程：

![在这里插入图片描述](https://img-blog.csdnimg.cn/7be95306be4944eaa406c88d9c5bee94.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA56CB5YacQ-mjjg==,size_20,color_FFFFFF,t_70,g_se,x_16)

先判断待处理的模块，如果为js，判断是否有高级的JS语法，没有就直接打包处理，否则就判断是否安装配置相关的loader

在webpack中，一切皆模块； 所以js中可以导入任何的模块比如css等

## 3.打包处理css文件

这里可以继续操作上面的index.html，为其加上样式，在src目录下再创建css文件夹，

其中的index.html 【去掉列表前面的*】

```css
ul:{     ----> 这是错误的写法，选择器后面应该直接跟{}，加上: 在firefox中会警告
	list-style: none;
}

--------------直接就是选择器加上{样式}---------------
ul{
	list-style: none;
}
12345678
```

要让这个css文件生效，按照之前，就会link链入，现在按照模块化思维，直接导入到index.js中即可

```javascript
import  './css/index.css' //只是执行，不使用，所以直接加路径
1
```

- 安装加载器style-loader，css-loader，直接运行命令 ：

  ```cmd
  npm i style-loader css-loader -D
  ```

  

- 配置 ： 在webpack.config.js中的modlue -> rules数组中，添加loader规则,test和use分别指定后缀名和其加载器； style-loader在css-loader之前

```javascript
const path = require('path') //CommonJS引入path包

//1.使用commonJS语法导入html-webpack-plugin包
const HtmlPlugin = require('html-webpack-plugin')

//2.创建html插件的实例对象
const htmlPlugin = new HtmlPlugin({
	template: './src/index.html',//指定源文件的存放路径
	filename: './index.html'  //指定生成文件的存放路径
})

module.exports ={
	mode: 'development',//mode值有development和production，开发阶段就用dev
	entry: path.join(__dirname,'./src/index.js'), 
	output: {
		path: path.join(__dirname,'./dist'),
		filename: 'boundle.js'
	},
	plugins: [htmlPlugin],  //通过plugin结点，让HtmlPlugin生效
	devServer:{
        static: {
     	 directory: path.join(__dirname, '/'),
    	},
		open: true,  //代表是否自动打开
		host: '127.0.0.1',
		port:8090  //这样就不会出现占用
	},
	module:{ //所有第三方文件模块的匹配规则标识
		rules:[ //文件后缀名的匹配规则
			{test:/\.css$/,use:['style-loader','css-loader']} //test为正则，文件正则；use为使用的加载器
		]
	}
}

```

重启服务器，运行即可打包

#### Can’t resolve ‘style.loader’ 问题

这里是因为我们安装了高版本的webpack，所以配置的语法已经不是之前的，**在webpack4.xx以后，配置loader必须要用对象的方式指明loader，即 use:[{loader:xxx},……]**

```javascript
module:{ //所有第三方文件模块的匹配规则标识
		rules:[ //文件后缀名的匹配规则
			{ test: /\.css/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] } //test为正则，文件正则；use为使用的加载器
		]
	}

```

**这里就是要注意，loader前面必须加上loader:**

**注意：**

- use 数组中指定的 loader 顺序是固定的
- 多个loader 的调用顺序是：`从后往前调用`

## 4.打包处理less文件

less文件可以操作margin和padding等位置，所以这里就美化一下之前的列表，在css下面新建一个index.less文件

```less
html,body,ul{
	margin: 0;
	padding: 0;
	li{
		line-height: 35px;
		padding-left: 10px;
		font-size: 12px;
	}
}

```

之后在index.js中导入这个模块 import ‘./css/index.less’，要想打包处理，还是需要安装配置两个loader

安装 两个包less-loader 和 less ：

**注意：**less是less-loader的内置依赖项

```cmd
 npm i less-loader less -D
```

配置 ：

```javascript
 { test: /\.less$/,use: [{ loader: ‘style-loader’ }, { loader: ‘css-loader’ },{loader:‘less-loader’}]}//不用less,less是less-loader的内置依赖项，而是要用style和css
```



#### 打包处理[样式表](https://so.csdn.net/so/search?q=样式表&spm=1001.2101.3001.7020)中与url相关的文件 url-loader file-loader

现在在index上面新建一个id为box的div，目的是将src/img/local.png作为该box的背景图片

正常来说，在index.less下面，会对这个div进行样式的编辑

```less
#box{
	width: 380px;
	height: 114px;
	background-color: yellow;
	background: url(../img/local.png);
}
123456
```

保存之后，也还是报错了： You may need an appropriate loader to handle this file type, 这是因为不能处理图片文件.jpg,.png结尾的文件

安装： `npm i url-loader file-loader -D` 安装两个loader

配置 ： `{ test: /\.jpg|png|gif$/,use:[{loader: 'url-loader'}]} //暂时就只配置url-loader，图片各种后缀使用|`

之后重新运行即可：但是div的背景是截取的图片的一部分…

**url-loader参数limit**

网页中，小的图片可以直接转化为base64直接加载，大型图片再发请求，这样可以提高网页访问的性能，而选择大小就需要url-loader的参数limit ，小于等于的就会转为base64，limit是用来指定图片的大小，单位为byte

```test
{ test: /\.jpg|png|gif$/,use:[{loader: 'url-loader?limit=207946'}]
1
```

设置之后可以重新查看图片 ： url(data:image/png;base64 —> 被转为了base64

## 5.打包处理样式表中与url路径相关的文件 

现在在index上面新建一个id为box的div，目的是将src/img/local.png作为该box的背景图片

正常来说，在index.less下面，会对这个div进行样式的编辑

```less
#box{
	width: 380px;
	height: 114px;
	background-color: yellow;
	background: url(../img/local.png);
}
123456
```

保存之后，也还是报错了： You may need an appropriate loader to handle this file type, 这是因为不能处理图片文件.jpg,.png结尾的文件

安装： `npm i url-loader file-loader -D` 安装两个loader

配置 ： `{ test: /\.jpg|png|gif$/,use:[{loader: 'url-loader'}]} //暂时就只配置url-loader，图片各种后缀使用|`

之后重新运行即可：但是div的背景是截取的图片的一部分…

**url-loader参数limit**

网页中，小的图片可以直接转化为base64直接加载，大型图片再发请求，这样可以提高网页访问的性能，而选择大小就需要url-loader的参数limit ，小于等于的就会转为base64，limit是用来指定图片的大小，单位为byte

```test
{ test: /\.jpg|png|gif$/,use:[{loader: 'url-loader?limit=207946'}]
1
```

设置之后可以重新查看图片 ： url(data:image/png;base64 —> 被转为了base64

#### loader配置其他方式

loader配置可以采用对象的方式进行配置：

```javascript
use:{
    loader:'url-loader' , //loader属性指向调用的loader
    options:{
        limit:2229  //通过options指定参数项
    }
}
123456
```

#### 打包处理js文件高级语法

webpack只能打包处理一部分高级的js语法，对于webpack无法处理的js高级语法，只能使用babel-loader来协助打包；**最新版本的webpack可以处理**

```javascript
class Person{
	//使用static为Person类声明一个静态属性
	//webpack无法处理这个static的高级语法，需要使用babel-loader
	static info = 'person info';
}
12345
```

babel-loader含有三个主要的包babel-loader，@babel/core，@babel/plugin-proposal-class-properties

安装 ： `npm i babel-loader @babel/core @babel/plugin-proposal-class-properties -D`

配置 ： 需要注意，除了test和use，还有一个exclude ： 排除项 ：‘node_modules’；babel-loader只需要处理用户编写的js文件，不需要处理node_modules下面的下载的其他的包文件，这样速度快

```javascript
{
				test: /\.js$/,
				exclude:/node_modules/ ,  //这里同样是正则
				use:{//要声明插件，用来转化高级语法，后面的@开头的都是插件
					loader: 'babel-loader',
					options:{
						plugins:['@babel/plugin-proposal-class-properties']
					}
				}
			}
12345678910
```

上面的都是rules数组的一项

### 打包发布

项目完成之后，使用webpack对项目进行打包发布 ：

- 开发环境下，打包生成的文件存放再内存中，无法获取到最终生成的文件
- 开发环境下，mode为development，不会对代码进行压缩和性能优化，所以需要打包发布

#### 配置webpack的打包发布

之前再package.json下面的scripts结点下配置的是dev命令，代表的就是development，当项目完成之后，重新配置命令`build`

```javascript
'build': 'webpack --mode production'  //没有serve，所以没有使用server插件，直接放到了物理的磁盘上，同时会修改webpack.config.js的mode为production，就会压缩
1
```

这里会覆盖config中的mode的值

这样使用命令`npm run build`

#### 生成文件位置统一

直接生成文件杂乱，要将js文件统一生成到js目录中，需要再output中进行配置

```javascript
//生成的位置filename，只要加上js级即可
output: {
		path: path.join(__dirname,'./dist'),
		filename: 'js/boundle.js'
	}
12345
```

对于图片文件，生成到img目录下，需要对url-loader进行配置，除了原来的limit参数，新增一个outputPath参数指定路径

```javascript
{ test: /\.jpg|png|gif$/,use:{
				loader: 'url-loader',
				options:{
					limit:227946,
					outputPath:'image'
				}
				}}
1234567
```

#### 自动清理dist目录

为了每次打包发布自动清理dist目录，安装配置插件`clean-webpack-plugin` npm i XX -D

安装配置这个插件和之前配置html插件是相同的

```javascript
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()

//1.使用commonJS语法导入html-webpack-plugin包
const HtmlPlugin = require('html-webpack-plugin')

//2.创建html插件的实例对象
const htmlPlugin = new HtmlPlugin({
	template: './src/index.html',//指定源文件的存放路径
	filename: './index.html'  //指定生成文件的存放路径
})

module.exports ={
	mode: 'development',//mode值有development和production，开发阶段就用dev
	entry: path.join(__dirname,'./src/index.js'), 
	output: {
		path: path.join(__dirname,'./dist'),
		filename: 'js/boundle.js'
	},
	plugins: [htmlPlugin,cleanPlugin],  //通过plugin结点，让HtmlPlugin生效
1234567891011121314151617181920
```

在高级的打包发布中，包括打包生成报告，分析具体的优化法案，Tree-Shaking，为第三方库提供CDN加载，配置组件的按需加载，开启路由懒加载，自定制首页的内容

### Source Map

生产环境中遇到的问题： 前端项目投入生产环境后，都需要对js文件进行压缩混淆，从而减小体积，提高加载效率，但是产生问题 ： 压缩后的代码不好debug

Source Map是一个信息文件，里面存储这位置信息， 存储代码压缩前后的位置的对应关系，有了Source Map，出错的时候，出错工具直接显示的源代码，而不是转换后的代码，方便后期的调试

在开发环境下，webpack默认开启了Source Map功能，出错的时候，控制台显示的错误行的位置，定位具体的源代码，但是默认的有一定的问题，**默认的是生产后的代码的位置，行数不一致**

在webpack-config.js文件中加入配置，就是和model平级

```javascript
module.exports ={
	mode: 'development',//mode值有development和production，开发阶段就用dev
	devtool: 'eval-source-map',   -----------------------------------------增加的配置
	entry: path.join(__dirname,'./src/index.js'), 
	output: {
		path: path.join(__dirname,'./dist'),
		filename: 'js/boundle.js'
	},
	plugins: [htmlPlugin,cleanPlugin],  //通过plugin结点，让HtmlPlugin生效
	devServer:{
		open: true,  //代表是否自动打开
		host: '127.0.0.1',
		port:8090  //这样就不会出现占用
	},
	module:{ //所有第三方文件模块的匹配规则标识
		rules
12345678910111213141516
```

配置之后，行数就是前后一致的

#### 生产环境下的Source Map

在生产环境下，省略devtool选项，最终生成的文件不包含Source Map，这就可以防止原始代码通过Source Map泄露，这样定位的错位都是转化的混淆的代码，对调试不好可以设置为： **只显示行数，不暴露代码**

```javascript
devtool: 'nosources-source-map'
1
```

这样既方便调试，也不会泄露代码

但是devtool ： ‘source-map’ 就是可以定位到源码，和之前的开发环境的eval-source-map的效果相同，十分不安全，一般就用nosources或者直接关闭🎄



