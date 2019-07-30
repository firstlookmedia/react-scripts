const packageConfig = require('./packageConfig');

const babelOptions = {
  passPerPreset: true,
  presets: [
    [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage', // or "entry"
          corejs: 3,
        },
      ],
    ],
    '@babel/typescript',
    '@babel/react',
  ],
  plugins: [
    [
      '@babel/transform-runtime',
      {
        corejs: 3,
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
