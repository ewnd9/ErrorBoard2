'use strict';

const config = require('./node_modules/webpackman/webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.entry = [
  'webpack-hot-middleware/client?reload=true',
  __dirname + '/src/client/app.js'
];

config.output.path = __dirname + '/public';
config.output.publicPath = '';

config.plugins = config.plugins.reduce((total, curr) => {
  if (curr instanceof HtmlWebpackPlugin) {
    total.push(new HtmlWebpackPlugin({
      template: __dirname + '/src/client/assets/index.html',
      inject: 'body',
      favicon: __dirname + '/src/client/assets/favicon.ico'
    }));
  } else {
    total.push(curr);
  }

  return total;
}, []);

module.exports = config;
