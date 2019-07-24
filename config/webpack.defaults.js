const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssCalc = require('postcss-calc');
const packageConfig = require('./packageConfig');

const cssOptions = {
  sourceMap: true,
  modules: true,
  importLoaders: 1,
  context: 'src/components',
  localIdentName: '[path][local]',
};

const babelOptions = {
  passPerPreset: true,
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    '@loadable/babel-plugin',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
      },
    ],
    'react-hot-loader/babel',
    [
      'relay',
      {
        compat: packageConfig.relayCompatMode || false,
        artifactDirectory: 'src/__generated__',
        schema: 'schema.graphql',
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};

module.exports = {
  babelOptions,
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
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      Types: path.resolve(__dirname, 'src/__generated__'),
    },
  },
  module: {
    rules: [
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
