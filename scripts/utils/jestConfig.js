const path = require('path');

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
  transform: {
    '\\.js$': path.resolve(__dirname, 'babelTransform.js'),
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/stories.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/.*__generated__/', '<rootDir>/src/assets/'],
  testRegex: 'src/.*__spec\\.(jsx?|tsx?)$',
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  setupFiles: [path.resolve(__dirname, 'testSetup.js')],
};
