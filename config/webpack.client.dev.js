const webpack = require('webpack');
const merge = require('webpack-merge');
const defaults = require('./webpack.defaults');

module.exports = merge.smart({
  module: {
    rules: [{
      test: /\.css$/,
      use: [require.resolve('style-loader')],
    }],
  },
}, defaults, {
  devtool: 'eval-source-map',
  entry: [require.resolve('webpack-hot-middleware/client')],
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
