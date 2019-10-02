const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const defaults = require('./webpack.defaults.js');
const packageConfig = require('./packageConfig');

const config = merge.smart(defaults, {
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'css-loader',
            options: {
              exportOnlyLocals: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve('node_modules'),
        use: [
          {
            loader: 'css-loader',
            options: {
              exportOnlyLocals: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              exportOnlyLocals: true,
            },
          },
        ],
      },
    ],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
  entry: path.resolve(packageConfig.serverEntry || 'server.js'),
  output: {
    filename: 'server.js',
    path: path.resolve('build'),
  },
  // put all node_modules into externals (require() them as usual w/o webpack)
  externals: [nodeExternals({
    whitelist: /\.css$/,
  })],
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

module.exports = config;
