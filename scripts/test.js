const spawn = require('cross-spawn');
const path = require('path');

const testConfig = path.resolve(__dirname, '../config/webpack.test.js');
const mochaWebpack = path.resolve(__dirname, '../node_modules/.bin/mocha-webpack');
const setup = path.resolve(__dirname, '../lib/testSetup.js');

console.log('Running tests...');

const child = spawn(
  'node',
  [
    mochaWebpack,
    '--colors',
    '--exit',
    '--webpack-config', testConfig,
    '--require', setup,
    'src/**/__spec.js',
  ],
  { stdio: 'inherit' }
);

child.on('close', code => process.exit(code));
child.on('exit', code => process.exit(code));
child.on('disconnect', code => process.exit(1));
