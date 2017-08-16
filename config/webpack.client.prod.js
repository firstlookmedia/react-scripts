const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const defaults = require('./webpack.defaults');

const config = Object.assign({}, defaults, {
  output: Object.assign({}, defaults.output, {
    filename: '[hash].js',
  }),
  module: Object.assign({}, defaults.module, {
    loaders: defaults.module.loaders.map(loader => {
      if (loader.name === 'css') {
        return Object.assign({}, loader, {
          loader: ExtractTextPlugin.extract(
            'style-loader',
            loader.loader,
            { allChunks: true }
          ),
        });
      }
      return loader;
    }),
  }),
  plugins: defaults.plugins.concat([
    new ManifestPlugin({ fileName: 'manifest.json' }),
    new ManifestPlugin({ fileName: `manifest.${Date.now()}.json` }),
    new ExtractTextPlugin('[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      mangle: true,
    }),
    new ProgressBarPlugin(),
  ]),
});

module.exports = config;
