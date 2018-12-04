const path = require('path');
const babelOptions = require('./babelTransform');

module.exports = {
  rootDir: process.cwd(),
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': path.resolve(
      __dirname,
      '__mocks__/file.js',
    ),
    '\\.(css|scss)$': require.resolve('identity-obj-proxy'),
    '^react-relay/compat$': path.resolve(__dirname, '__mocks__/react-relay/compat.js'),
    '^react-relay/classic$': path.resolve(__dirname, '__mocks__/react-relay/classic.js'),
    '^react-relay$': path.resolve(__dirname, '__mocks__/react-relay.js'),
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.js$': path.resolve(__dirname, 'babelTransform.js'),
    '^.+\\.(ts|tsx)$': 'ts-jest'.createTransformer({ babelConfig: babelOptions }),
  },

  collectCoverageFrom: ['src/**/*.tsx', '!src/**/*.stories.tsx'],
  testRegex: 'src/.*__spec\\.(jsx?|tsx?)$',
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  setupFiles: [path.resolve(__dirname, 'testSetup.js')],
};
