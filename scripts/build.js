process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const clientConfig = require('../config/webpack.production');
const serverConfig = require('../config/webpack.server');

console.log('Creating production build...');

webpack([clientConfig, serverConfig]).run((err, stats) => {
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }

  console.log('Compiled successfully');
});
