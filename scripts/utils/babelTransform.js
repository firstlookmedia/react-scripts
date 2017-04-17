const babelJest = require('babel-jest');
const config = require('../../config/webpack.defaults.js');

module.exports = babelJest.createTransformer(
  // use babel config defined in webpack config
  config.module.loaders.find(l => l.loader === 'babel-loader').query
);
