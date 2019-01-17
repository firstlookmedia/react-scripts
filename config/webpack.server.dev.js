const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const defaults = require('./webpack.server');

module.exports = Object.assign({}, defaults, {
  mode: 'development',
  entry: ['webpack/hot/poll?1000'].concat(defaults.entry),
  watch: true,
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000', /\.css$/],
  })],
  plugins: defaults.plugins.concat(
    new StartServerPlugin('server.js'),
    new webpack.HotModuleReplacementPlugin(),
  ),
});
