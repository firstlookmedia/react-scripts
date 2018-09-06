#!/usr/bin/env node

"use strict";

const crypto = require('crypto');
const path = require('path');
const spawn = require('cross-spawn');

const script = process.argv[2];
const args = process.argv.slice(3);

switch (script) {
  case 'build':
  case 'start':
  case 'upload':
  case 'upload-queries':
  case 'test': {
    const result = spawn.sync(
      'node',
      [require.resolve(path.join('../scripts', script))].concat(args),
      { stdio: 'inherit' }
    );
    process.exit(result.status);
    break;
  }
  case 'pwhash': {
    let stdin = process.openStdin();
    let data = "";
    stdin.on('data', function(chunk) {
      data += chunk;
    });

    stdin.on('end', function() {
      let hash = crypto.createHash('md5').update(data).digest('hex');
      console.log(hash);
    });
    break;
  }
  default:
    console.log(`Unknown script "${script}".`);
    break;
}
