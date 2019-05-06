const babelJest = require('babel-jest');
const config = require('../../config/webpack.defaults.js');

module.exports = babelJest.createTransformer({
  passPerPreset: true,
  presets: ['@babel/preset-react', '@babel/preset-env'].map(require.resolve),
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
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
  ].map(plugin =>
    (Array.isArray(plugin)
      ? require.resolve(plugin[0], plugin[1])
      : require.resolve(plugin))),
});
