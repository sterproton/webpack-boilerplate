const HtmlWebpackPlugin = require("html-webpack-plugin")
const merge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

module.exports = merge(webpackCommonConfig, {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: "Webpack demo",
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: "css/[name].css"
    })
  ],
  module: {
    rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader',
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
          use: ["css-loader",
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