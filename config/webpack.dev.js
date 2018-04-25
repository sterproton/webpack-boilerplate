const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const merge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const path = require('path')

module.exports = merge(webpackCommonConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack-boilerplate",
      template: path.resolve(__dirname,'../src/template/index.html'),
      minify: true
    }),
    new ErrorOverlayPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    stats: "errors-only",
    open: true,
    historyApiFallback: true,
    overlay: true,
    hotOnly: true,
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")()]
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',
        {
          loader: "postcss-loader",
          options: {
            plugins: () => [require("autoprefixer")()]
          },
        }
      ]
      }
    ]
  },
  mode: "development"
})