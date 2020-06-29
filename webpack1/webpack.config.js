// webpack是node写出来的 node 语法
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装 处理html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css的插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css优化插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js文件
const webpack = require('webpack')
module.exports = {
  // mode: 'development', // 不会进行js代码压缩，producton会进行压缩
  mode: 'production',
  optimization: {
    // 优化项
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        cache: true, // 缓存
        parallel: true, // 并发打包
        sourceMap: true // 源码映射
      })
    ]
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js', // 只显示八位hash
    path: path.resolve(__dirname, 'build') // 路径必须是绝对路径
  },
  // 插件的使用顺序没有先后的
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', // 打包后的文件名称
      minify: false,
      // minify: {
      //   removeAttributeQuotes: true,
      //   collapseInlineTagWhitespace: true
      // },
      hash: true
    }),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // }),
  ],
  module: {
    // css-loader 解析import这种语法 style-loader把css插入到head的标签中 loader的特点希望单一
    // 一个loader可以用字符串，多个采用数组  默认顺序从右到左执行 从下到上
    // loader还可以写成对象方式，对loader进行配置
    rules: [
       //配置 html读取img的src
       {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/, 
        //做一个限制  当小于多少k 用base64来转化 base64文件可以减少http请求 但是比原文件大3分之1
        // 否则用file-loader来产生真实的图片
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            //输出的路径
            outputPath: 'img/',
            esModule: false
            //只在图片中有一个公共的路径
            // publicPath: 'http:/111'
          },

          
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader', // es6 => es5
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        include: path.resolve(__dirname, 'src')
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'eslint-loader'
      //     }
      //   ],
      //   enforce: 'pre'
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insert: 'top',
          //     injectType: 'styleTag'
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 给css样式家前缀
          'less-loader'
        ]
      }
    ]
  }
};
