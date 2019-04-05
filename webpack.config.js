const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        loader: 'less-loader' // compiles Less to CSS
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
};