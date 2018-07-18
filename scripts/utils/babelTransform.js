const babelJest = require('babel-jest');
const config = require('../../config/webpack.defaults.js');

module.exports = babelJest.createTransformer({
  passPerPreset: true,
  presets: [
    'babel-preset-react',
    'babel-preset-env',
    'babel-preset-stage-0',
  ].map(require.resolve),
  plugins: [
    'babel-plugin-transform-runtime',
  ].map(require.resolve),
});
