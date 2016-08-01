const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
  externals: fs
    .readdirSync('node_modules')
    .filter(p => p !== '.bin')
    .reduce((obj, p) => { obj[p] = `commonjs ${p}`; return obj; }, {}),
  module: Object.assign({}, defaults.module, {
    loaders: defaults.module.loaders.map(loader => {
      if (loader.name === 'css') {
        return Object.assign({}, loader, {
          loader: ExtractTextPlugin.extract(
            'style',
            loader.loader,
            { allChunks: true }
          ),
        });
      }
      return loader;
    }),
  }),
  plugins: defaults.plugins.concat([
    // this seems to be required to make the css modules output their classnames...
    // webpack.production.js is really responsible for css output
    new ExtractTextPlugin('unused.css'),

    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    )
  ]),
  devtool: 'source-map',
});

module.exports = config;
