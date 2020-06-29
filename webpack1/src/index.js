import $ from 'jquery'
// import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery';
// 这个全局暴露的方法需要参考npm 官网上最新的示例
// require("jquery");

// expose-loader 是对外暴露 如果不需要引入可以直接使用 
console.log($)
require('./index.less');

// 打包图片代码

