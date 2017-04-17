const path = require('path');

module.exports = () => ({
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.resolve(__dirname, '__mocks__/file.js'),
    '\\.(css)$': require.resolve('identity-obj-proxy'),
    'react-relay': path.resolve(__dirname, '__mocks__/react-relay.js'),
  },
  collectCoverageFrom: ['src/**/*.js'],
  testRegex: 'src/.*__spec\\.js$',
});
