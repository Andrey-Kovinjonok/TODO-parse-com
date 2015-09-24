/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [ '', '.js', '.jsx', '.styl' ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    //new ExtractTextPlugin('main.css', { disable: false, allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: true
      },
      sourceMap: false })
  ],

  module: {
    loaders: [{
      test: /\.styl$/,
      loader: 'style!css!stylus?paths=node_modules/'
      //loader: ExtractTextPlugin.extract('style', 'css-loader!stylus-loader')
    }, {
      test: /\.jsx?$/,
      loaders: ['babel?stage=0'],
      include: path.join(__dirname, 'src')
    }]
  }
};
