const babelJest = require('babel-jest');
const config = require('./babelLoaderConfig.json');

module.exports = babelJest.createTransformer(config);
