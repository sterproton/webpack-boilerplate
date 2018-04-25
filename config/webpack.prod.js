const HtmlWebpackPlugin = require("html-webpack-plugin")
const merge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const PurifyCSSPlugin = require("purifycss-webpack")
const glob = require('glob')

module.exports = merge(webpackCommonConfig, {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: "css/[name].css"
    }),
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