const packageConfig = require('./packageConfig');

const babelOptions = {
  passPerPreset: true,
  presets: [
    [
      '@babel/env',
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Do not transform modules to CJS
        modules: false,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    '@babel/typescript',
    '@babel/react',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        regenerator: true,
      },
    ],
    '@loadable/babel-plugin',
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

module.exports = babelOptions;
