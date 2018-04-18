const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssCalc = require('postcss-calc');

module.exports = {
  mode: 'development',
  entry: [
    require.resolve('babel-polyfill'),
    path.resolve('src/index.js'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve('build/assets'),
    publicPath: '/assets/',
  },
  plugins: [],
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [path.resolve('src'), path.resolve('server.js')],
      use: [{
        loader: 'babel-loader',
        options: {
          passPerPreset: true,
          presets: [
            'babel-preset-react',
            'babel-preset-env',
            'babel-preset-stage-2',
          ].map(require.resolve),
          plugins: [
            'babel-plugin-transform-runtime',
          ].map(require.resolve),
        },
      }],
    }, {
      test: /\.css$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            context: 'src/components',
            localIdentName: '[path][local]',
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => ([
              precss(),
              autoprefixer(),
              postcssCalc(),
            ]),
          },
        },
      ],
    }, {
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
    }, {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.json$/,
      use: 'json-loader',
    }, {
      test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
      use: 'imports-loader?define=>false&this=>window',
    }],
  },
};
