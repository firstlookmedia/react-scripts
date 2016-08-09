const webpack = require('webpack');
const defaults = require('./webpack.defaults');
const externals = require('webpack-node-externals');

module.exports = Object.assign({}, defaults, {
  target: 'node',
  externals: [externals()],
  plugins: defaults.plugins.concat([
    new webpack.BannerPlugin(
      'require("source-map-support").install({ environment: "node" });',
      { raw: true, entryOnly: false }
    ),
  ]),
  devtool: 'source-map',
});
