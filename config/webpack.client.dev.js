const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const defaults = require('./webpack.defaults');

const config = merge.smart(
  {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve('src'),
          use: ['style-loader'],
        },
        {
          test: /\.css$/,
          include: path.resolve('node_modules'),
          use: ['style-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader'],
        },
      ],
    },
  },
  defaults,
  {
    devtool: 'eval-source-map',
    entry: ['webpack-hot-middleware/client'],
    plugins: [
      new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
);

module.exports = config;
