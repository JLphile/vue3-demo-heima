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

## 5.加载 images 图像

假如，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢？在 webpack 5 中，可以使用内置的 [Asset Modules](https://webpack.docschina.org/guides/asset-modules/)，我们可以轻松地将这些内容混入我们的系统中：

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
+      {
+        test: /\.(png|svg|jpg|jpeg|gif)$/i,
+        type: 'asset/resource',
+      },
     ],
   },
 };
```

现在，在 `import MyImage from './my-image.png'` 时，此图像将被处理并添加到 `output` 目录，*并且* `MyImage` 变量将包含该图像在处理后的最终 url。在使用 [css-loader](https://webpack.docschina.org/loaders/css-loader) 时，如前所示，会使用类似过程处理你的 CSS 中的 `url('./my-image.png')`。loader 会识别这是一个本地文件，并将 `'./my-image.png'` 路径，替换为 `output` 目录中图像的最终路径。而 [html-loader](https://webpack.docschina.org/loaders/html-loader) 以相同的方式处理 `<img src="./my-image.png" />`。

我们向项目添加一个图像，然后看它是如何工作的，你可以使用任何你喜欢的图像：

**project**

```diff
  webpack-demo
  |- package.json
  |- package-lock.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

**src/index.js**

```diff
 import _ from 'lodash';
 import './style.css';
+import Icon from './icon.png';

 function component() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

+  // 将图像添加到我们已经存在的 div 中。
+  const myIcon = new Image();
+  myIcon.src = Icon;
+
+  element.appendChild(myIcon);
+
   return element;
 }

 document.body.appendChild(component());
```

**src/style.css**

```diff
 .hello {
   color: red;
+  background: url('./icon.png');
 }
```

重新构建并再次打开 `index.html` 文件：

```bash
$ npm run build

...
[webpack-cli] Compilation finished
assets by status 9.88 KiB [cached] 1 asset
asset bundle.js 73.4 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 1.82 KiB 6 modules
orphan modules 326 bytes [orphan] 1 module
cacheable modules 540 KiB (javascript) 9.88 KiB (asset)
  modules by path ./node_modules/ 539 KiB
    modules by path ./node_modules/css-loader/dist/runtime/*.js 2.38 KiB
      ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
      ./node_modules/css-loader/dist/runtime/getUrl.js 830 bytes [built] [code generated]
    ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
  modules by path ./src/ 1.45 KiB (javascript) 9.88 KiB (asset)
    ./src/index.js + 1 modules 794 bytes [built] [code generated]
    ./src/icon.png 42 bytes (javascript) 9.88 KiB (asset) [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/style.css 648 bytes [built] [code generated]
webpack 5.4.0 compiled successfully in 1972 ms
```

如果一切顺利，你现在应该看到你的 icon 图标成为了重复的背景图，以及 `Hello webpack` 文本旁边的 `img` 元素。如果检查此元素，你将看到实际的文件名已更改为 `29822eaa871e8eadeaa4.png`。这意味着 webpack 在 `src` 文件夹中找到我们的文件，并对其进行了处理！





------



## 6.打包发布

项目完成之后，使用webpack对项目进行打包发布 ：

- 开发环境下，打包生成的文件存放再内存中，无法获取到最终生成的文件
- 开发环境下，mode为development，不会对代码进行压缩和性能优化，所以需要打包发布

#### 6.1 配置webpack的打包发布

之前再package.json下面的scripts结点下配置的是dev命令，代表的就是development，当项目完成之后，重新配置命令`build`

```javascript
'build': 'webpack --mode production'  //没有serve，所以没有使用server插件，直接放到了物理的磁盘上，同时会修改webpack.config.js的mode为production，就会压缩
1
```

这里会覆盖config中的mode的值

这样使用命令`npm run build`

#### 6.2 自定义输出文件名

默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 webpack 配置中设置 [`output.assetModuleFilename`](https://webpack.docschina.org/configuration/output/#outputassetmodulefilename) 来修改此模板字符串：

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

另一种自定义输出文件名的方式是，将某些资源发送到指定目录：

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
-     }
+     },
+     {
+       test: /\.html/,
+       type: 'asset/resource',
+       generator: {
+         filename: 'static/[hash][ext][query]'
+       }
+     }
    ]
  },
};
```

使用此配置，所有 `html` 文件都将被发送到输出目录中的 `static` 目录中。

`Rule.generator.filename` 与 [`output.assetModuleFilename`](https://webpack.docschina.org/configuration/output/#outputassetmodulefilename) 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。

------



#### 6.3 Source Map

生产环境中遇到的问题： 前端项目投入生产环境后，都需要对js文件进行压缩混淆，从而减小体积，提高加载效率，但是产生问题 ： 压缩后的代码不好debug

Source Map是一个信息文件，里面存储这位置信息， 存储代码压缩前后的位置的对应关系，有了Source Map，出错的时候，出错工具直接显示的源代码，而不是转换后的代码，方便后期的调试

在开发环境下，webpack默认开启了Source Map功能，出错的时候，控制台显示的错误行的位置，定位具体的源代码，但是默认的有一定的问题，**默认的是生产后的代码的位置，行数不一致**

在webpack-config.js文件中加入配置，就是和model平级

```javascript

```

配置之后，行数就是前后一致的

#### 生产环境下的Source Map

在生产环境下，省略devtool选项，最终生成的文件不包含Source Map，这就可以防止原始代码通过Source Map泄露，这样定位的错位都是转化的混淆的代码，对调试不好可以设置为： **只显示行数，不暴露代码**

```javascript

```

这样既方便调试，也不会泄露代码

但是devtool ： ‘source-map’ 就是可以定位到源码，和之前的开发环境的eval-source-map的效果相同，十分不安全，一般就用nosources或者直接关闭🎄



