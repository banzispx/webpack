// 这个主要实现html的打包
// webpack是node写出来的 node 语法
let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装 处理html的插件
module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: 'build',
    compress: true
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js', // 只显示八位hash
    path: path.resolve(__dirname, 'build') // 路径必须是绝对路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', // 打包后的文件名称
      minify: {
        removeAttributeQuotes: true,
        collapseInlineTagWhitespace :true
      },
      hash: true

    })
  ]
}