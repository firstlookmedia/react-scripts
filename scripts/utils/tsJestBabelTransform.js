const babelOptions = {
  presets: ['env', 'react'],
  plugins: ['require-context-hook'],
};

module.exports = require('ts-jest').createTransformer({ babelConfig: babelOptions });
