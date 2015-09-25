/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  //devtool: 'eval-source-map',
  devtool: 'source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', 'json' ]
  },

  /*externals: {
    Config: apiConfig
  },*/

  module: {
    loaders: [{
      test: /\.styl$/,
      loader: 'style!css!stylus?paths=node_modules/'
      //loader: ExtractTextPlugin.extract('style', 'css-loader!stylus-loader')
    }, {
      test: /\.jsx?$/,
      loaders: ['babel?stage=0'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json/,
      loader: 'file?limit=10000' + '&name=[path]/[name].[ext]'
    }]
  }
};
