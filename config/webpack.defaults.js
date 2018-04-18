const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

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
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../node_modules')],
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [path.resolve('src'), path.resolve('server.js')],
      use: [{
        loader: require.resolve('babel-loader'),
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
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            context: 'src/components',
            localIdentName: '[path][local]',
            sourceMap: true,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => ([
              precss(),
              autoprefixer(),
            ]),
          },
        },
      ],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        {
          loader: require.resolve('file-loader'),
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[hash].[ext]',
          },
        },
        {
          loader: require.resolve('image-webpack-loader'),
          options: {
            bypassOnDebug: true,
          },
        },
      ],
    }, {
      test: /\.woff2?$/,
      use: [{
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      }],
    }, {
      test: /\.json$/,
      use: require.resolve('json-loader'),
    }, {
      test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
      use: 'imports-loader?define=>false&this=>window',
    }],
  },
};
