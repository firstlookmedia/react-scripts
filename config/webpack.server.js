const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const defaults = require('./webpack.defaults.js');

const config = Object.assign({}, defaults, {
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
    publicPath: defaults.output.publicPath,
  },
  // put all node_modules into externals (node will just require() them usual)
  externals: [nodeExternals()],
  module: Object.assign({}, defaults.module, {
    loaders: defaults.module.loaders.map(loader => {
      if (loader.name === 'css') {
        return Object.assign({}, loader, {
          loader: undefined,
          loaders: [
            path.join(__dirname, '../lib/exportLocalsLoader.js'),
            loader.loader,
          ],
        });
      }
      return loader;
    }),
  }),
  plugins: defaults.plugins.concat([
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),

    new ProgressBarPlugin(),
  ]),
  devtool: 'source-map',
});

module.exports = config;
