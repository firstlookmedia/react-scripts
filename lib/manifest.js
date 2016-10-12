const fs = require('fs');
const path = require('path');

// this is a map of original asset file names to their names
// after being built (which is a hash of their contents)
//
// USAGE
//
// manifest['main.js']
// // => '27625cbb9b30eaa6df35.js'

const isProd = process.env.NODE_ENV === 'production';

// manifest defaults for development
const manifest = {
  'main.js': 'main.js',
  'main.css': 'main.css',
};

if (isProd) {
  try {
    // override with real file names for production
    Object.assign(
      manifest,
      JSON.parse(fs.readFileSync(path.resolve('build/assets/manifest.json')))
    );
  } catch (err) {
    console.error('Didn’t find manifest.json. Did you `$ npm run build`?');
    process.exit(1);
  }
}

module.exports = manifest;
