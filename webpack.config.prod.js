var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  // postcss: [
  //   autoprefixer({
  //     browsers: ['last 2 versions']
  //   })
  // ],
  resolve: {
    extensions: ['', '.js','.scss'],
    root: [path.join(__dirname, './src')]
  },
  module: {
    loaders: [{
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
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass'),
    }]
  }
};
