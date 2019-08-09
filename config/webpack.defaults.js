const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssCalc = require('postcss-calc');
const packageConfig = require('./packageConfig');
const babelOptions = require('./babelOptions');

const cssOptions = {
  sourceMap: true,
  modules: true,
  importLoaders: 1,
  context: 'src/components',
  localIdentName: '[path][local]',
};

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: [path.resolve(packageConfig.clientEntry || 'src/index.js')],
  output: {
    filename: '[name].js',
    path: path.resolve('build/assets'),
    publicPath: '/assets/',
  },
  plugins: [],
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx',
    ],
    alias: {
      Types: path.resolve(__dirname, 'src/__generated__'),
    },
  },
  module: {
    rules: [
      {
        test: /\btranslations\.(json|ya?ml)$/,
        type: 'javascript/auto',
        loader: 'messageformat-loader',
        options: {
          locale: packageConfig.locale || 'en',
        },
      },
      {
        test: /\.tsx*$/,
        include: [path.resolve('src')],
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.jsx*$/,
        include: [path.resolve('src'), path.resolve('server.js')],
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'css-loader',
            options: cssOptions,
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: [autoprefixer(), postcssCalc(), precss()],
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
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: { ...cssOptions, importLoaders: 3 },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,

              // needed to have two different postcss configs
              // without this, it just silently fails
              ident: 'postcss-sass',

              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.woff2?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        use: 'imports-loader?define=>false&this=>window',
      },
    ],
  },
};
