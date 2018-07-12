const webpack = require('webpack');
const merge = require('webpack-merge');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const defaults = require('./webpack.defaults');

const config = merge.smart({
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader'],
    }, {
      test: /\.scss$/,
      use: ['style-loader'],
    }],
  },
}, defaults, {
  devtool: 'eval-source-map',
  entry: ['webpack-hot-middleware/client'],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactLoadablePlugin({
      filename: 'react-loadable.json',
    }),
  ],
});

module.exports = config;
