var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css")
  ],
  module: {
    loaders: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader","css-loader")
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }
    ]
  }
};
