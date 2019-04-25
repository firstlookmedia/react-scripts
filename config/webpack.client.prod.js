const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
          use: [MiniCSSExtractPlugin.loader],
        },
        {
          test: /\.css$/,
          include: path.resolve('node_modules'),
          use: [MiniCSSExtractPlugin.loader],
        },
        {
          test: /\.scss$/,
          use: [MiniCSSExtractPlugin.loader],
        },
      ],
    },
  },
  defaults,
  {
    mode: 'production',
    output: {
      filename: '[hash].js',
    },
    plugins: [
      new ManifestPlugin({ fileName: 'manifest.json' }),
      new ManifestPlugin({ fileName: `manifest.${Date.now()}.json` }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new ProgressBarPlugin(),
      new MiniCSSExtractPlugin({
        filename: '[contenthash].css',
      }),
      new OptimizeCSSAssetsPlugin({}),
      new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
    ],
  },
);

module.exports = config;
