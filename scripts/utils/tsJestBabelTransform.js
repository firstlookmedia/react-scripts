const babelOptions = {
  plugins: ['require-context-hook'],
};

module.exports = require('ts-jest').createTransformer({ babelConfig: babelOptions });
