const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const defaults = require('./webpack.defaults.js');

module.exports = merge.smart({
  module: {
    rules: [{
      test: /\.css$/,
      use: [path.join(__dirname, '../lib/exportLocalsLoader.js')],
    }, {
      test: /\.scss$/,
      use: [path.join(__dirname, '../lib/exportLocalsLoader.js')],
    }],
  },
}, defaults, {
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
  entry: path.resolve('server.js'),
  output: {
    filename: 'server.js',
    path: path.resolve('build'),
  },
  // put all node_modules into externals (require() them as usual w/o webpack)
  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: true,
    }),
    new ProgressBarPlugin(),
  ],
  devtool: 'source-map',
});
