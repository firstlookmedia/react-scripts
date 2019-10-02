process.env.NODE_ENV = 'production';

const path = require('path');
const spawn = require('cross-spawn');
const relayCompilerArguments = require('./utils/relayCompilerArguments');

console.log('Compiling relay queries...');
const relayCompiler = spawn(
  path.resolve('./node_modules/.bin/relay-compiler'),
  relayCompilerArguments,
  { stdio: 'inherit' },
);

relayCompiler.on('close', (code) => {
  if (code) {
    process.exit(code);
  }
});
