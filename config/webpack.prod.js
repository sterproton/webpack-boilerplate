const HtmlWebpackPlugin = require("html-webpack-plugin")
const merge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const PurifyCSSPlugin = require("purifycss-webpack")
const glob = require('glob')

module.exports = merge(webpackCommonConfig, {
  optimization:{
    splitChunks: {
      cacheGroups: {
        //将导入的npm package设为vender
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "js/public/vender",
          chunks: "initial",
        },
      },
    }
  },
  plugins: [
    //在build前清理原来build出的dist
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),
    //将webpack默认inline CSS改为提取单独的CSS文件
    new ExtractTextPlugin({
      allChunks: true,
      //修改css文件输出的路径(可选)
      filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js','css')
      }
    }),
    //去除绝大多数多余的css规则，glob里设置需要被purify的组件的路径
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "../src/*.js"), {
        nodir: true
      }),
      minimize: true
    }),
    new HtmlWebpackPlugin({
      title: "webpack-boilerplate",
      template: path.resolve(__dirname, '../src/template/index.html'),
      minify: true,
    }),
  ],
  module: {
    rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")()]
              },
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")()]
              },
            }
          ]
        })
      }
    ]
  },
  mode: "production",
})