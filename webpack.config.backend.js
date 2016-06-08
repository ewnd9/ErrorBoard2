'use strict';

const webpack = require('webpack');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const config = require(__dirname + '/webpack.config.prod');

config.target = 'node';
config.entry = __dirname + '/src/cli.js';
config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false
};
config.output.path = __dirname + '/dist';
config.output.filename = 'backend.js';
config.externals = [nodeExternals()];

config.plugins = config.plugins.reduce(function(total, curr) {
  if (!(curr instanceof webpack.optimize.CommonsChunkPlugin) &&
      !(curr instanceof webpack.optimize.UglifyJsPlugin) &&
      !(curr instanceof webpack.DefinePlugin)) {
    total.push(curr);
  }

  return total;
}, []);

module.exports = config;
