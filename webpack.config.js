//webpack.config.js
/**
 * @type {import('webpack').Configuration}
 */

const path = require('path')

//1.导入HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')

//2.创建HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html', //指定原文件的存放路径
  filename: './index.html', //指定生成的文件的存放路径
})

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
    filename: 'js/bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devtool: 'eval-cheap-module-source-map',

  // 服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    open: true, //初次打包完成后，自动打开浏览器
    host: '127.0.0.1', //实时打包所使用的主机地址
    port: 8080, //实时打包所使用的端口号
  },
  plugins: [htmlPlugin], //3.通过 plugins 节点，使 htmlPlugin 插件生效
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
