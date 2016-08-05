const webpack = require('webpack');
const defaults = require('./webpack.defaults');

const config = Object.assign({}, defaults, {
  devtool: 'cheap-module-source-map',
  module: Object.assign({}, defaults.module, {
    loaders: defaults.module.loaders.map(loader => {
      if (loader.name === 'css') {
        return Object.assign({}, loader, {
          loader: `style-loader!${loader.loader}`,
        });
      }
      return loader;
    }),
  }),
  entry: [
    require.resolve('webpack-hot-middleware/client'),
  ].concat(defaults.entry),
  plugins: defaults.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),
});

module.exports = config;
