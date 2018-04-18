const webpack = require('webpack');
const merge = require('webpack-merge');
const defaults = require('./webpack.defaults');

module.exports = merge.smart({
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader'],
    }],
  },
}, defaults, {
  devtool: 'source',
  entry: [require.resolve('webpack-hot-middleware/client')],
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
