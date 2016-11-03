const webpack = require('webpack');
const path = require('path');
const defaults = require('./webpack.defaults');
const externals = require('webpack-node-externals');

module.exports = Object.assign({}, defaults, {
  target: 'node',
  externals: [externals({
    whitelist: ['react-relay'], // to make the alias work
  })],
  plugins: defaults.plugins.concat([
    new webpack.BannerPlugin(
      'require("source-map-support").install({ environment: "node" });',
      { raw: true, entryOnly: false }
    ),
  ]),
  devtool: 'source-map',
  resolve: Object.assign({}, defaults.resolve, {
    alias: {
      'react-relay': path.resolve(__dirname, '../lib/mockRelay.js'),
      'real-react-relay': path.resolve('node_modules/react-relay'),
    },
  }),
});
