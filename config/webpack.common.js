const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const rootPath = path.resolve(__dirname)
const entryPath = path.resolve(rootPath,"../src/index.js")
const outputPath = path.resolve(rootPath, "../dist")

module.exports = {
  entry:{
    index: entryPath
  },
  output: {
    path: outputPath,
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1192,
          name: 'imgs/[name][hash:8].[ext]'
        }
      }
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }],
  }
};