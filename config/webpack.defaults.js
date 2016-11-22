const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
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
    extensions: ['', '.js', '.json'],
  },
  resolveLoader: {
    root: path.resolve(__dirname, '../node_modules'),
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve('src'), path.resolve('server.js')],
      query: {
        passPerPreset: true,
        presets: [
          'babel-preset-react',
          'babel-preset-es2015',
          'babel-preset-stage-0',
        ].map(require.resolve),
        plugins: [
          'babel-plugin-transform-runtime',
        ].map(require.resolve),
      },
    }, {
      name: 'css',
      test: /\.css$/,
      loader: 'css?modules&importLoaders=1&context=src/components&localIdentName=[path][local]!postcss',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    }, {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
      loader: 'imports?define=>false&this=>window',
    }],
  },
  postcss: () => [
    precss,
    autoprefixer,
  ],
};
