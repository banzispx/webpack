let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//内置插件  版权归谁谁谁所有 先导入webpack
const webpack = require('webpack')
//copy插件
const copyWpackPlugin = require('copy-webpack-plugin')
module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {main: './src/main.js'},
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),//清除dist目录
    new copyWpackPlugin(
      {
        //接受一个数组 可以多个文件
        patterns:[{from:'./doc',to:'./'}]
      }
    ),
    new webpack.BannerPlugin('make by hanke ,i will become success!')
  ]
}