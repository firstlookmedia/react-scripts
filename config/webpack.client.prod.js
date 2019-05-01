const webpack = require('webpack');
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
      filename: '[name]-bundle-[chunkhash:8].js',
    },
    plugins: [
      new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new ProgressBarPlugin(),
      new MiniCSSExtractPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          reduceIdents: false,
        },
      }),
    ],
  },
);

module.exports = config;
