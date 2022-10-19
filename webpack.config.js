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

  // 服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    open: true,
    port: 8080,
  },
}
