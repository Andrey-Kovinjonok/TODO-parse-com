/* eslint-disable no-var, strict */
'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,

  stats: {
    colors: true,
    timings: true
  },
  debug: true,
  keepalive: true,

  historyApiFallback: true
});

server.listen(4000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at http://localhost:4000/');
});
