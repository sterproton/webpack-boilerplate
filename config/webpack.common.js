const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const rootPath = path.resolve(__dirname)
const entryPath = path.resolve(rootPath, "../src/index.js")
const outputPath = path.resolve(rootPath, "../dist")
const srcPath = path.resolve(rootPath, "../src")

module.exports = {
  entry: {
    index: entryPath
  },
  output: {
    path: outputPath,
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [{
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'imgs/[hash:8].[ext]',
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true
          }
        }
      ]
    }, {
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, '../src'),
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }, {
      // Match woff2 in addition to patterns like .woff?v=1.1.1.
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          // Limit at 50k. Above that it emits separate files
          limit: 50000,

          // url-loader sets mimetype if it's passed.
          // Without this it derives it from the file extension
          mimetype: "application/font-woff",

          // Output below fonts directory
          name: "./fonts/[name].[ext]",
        },
      }
    }, ],
  }
};