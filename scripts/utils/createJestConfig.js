const path = require('path');

module.exports = () => ({
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.resolve(__dirname, '__mocks__/file.js'),
    '\\.(css)$': require.resolve('identity-obj-proxy'),
    'react-relay': path.resolve(__dirname, '__mocks__/react-relay.js'),
  },
  transform: {
    '\\.js$': path.resolve(__dirname, 'babelTransform.js'),
  },
  collectCoverageFrom: ['src/**/*.js'],
  testRegex: 'src/.*__spec\\.js$',
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
});
