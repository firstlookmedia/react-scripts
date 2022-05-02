process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const filesize = require('filesize');
const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size').sync;
const chalk = require('chalk');
const spawn = require('cross-spawn');
const clientConfig = require('../config/webpack.client.prod');
const serverConfig = require('../config/webpack.server');
const relayCompilerArguments = require('./utils/relayCompilerArguments');
const buildPersistedQueries = require('../lib/buildPersistedQueries');

function printFileSizes(stats, config) {
  const outputPath = config.output.path;
  const assets = stats.toJson().assets.map((asset) => {
    const fileContents = fs.readFileSync(path.join(outputPath, asset.name));
    const size = gzipSize(fileContents);
    return {
      name: path.basename(asset.name),
      size,
      sizeLabel: filesize(size),
    };
  });
  assets.sort((a, b) => b.size - a.size);
  const longestSizeLabelLength = Math.max.apply(null, assets.map(a => a.sizeLabel.length));
  assets.forEach((asset) => {
    let sizeLabel = asset.sizeLabel;
    const sizeLength = sizeLabel.length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    const dirname = path.relative('', outputPath);
    console.log(`  ${sizeLabel}  ${chalk.dim(dirname + path.sep)}${chalk.cyan(asset.name)}`);
  });
}

function handler(config, err, stats) {
  if (err) {
    console.error(err.stack || err.message || err);
    process.exit(1);
  }
  if (stats.hasErrors()) {
    console.log(stats.toString('errors-only'));
    process.exit(1);
  } else {
    printFileSizes(stats, config);
  }
}
console.log('Compiling relay queries...');
const relayCompiler = spawn(
  path.resolve('./node_modules/.bin/relay-compiler'),
  relayCompilerArguments.concat('--watchman', 'false'),
  { stdio: 'inherit' },
);

relayCompiler.on('close', (code) => {
  if (code) {
    process.exit(code);
    return;
  }

  console.log('Building optimized assets...');
  webpack(clientConfig).run((err, stats) => {
    handler(clientConfig, err, stats);

    console.log();
    console.log('Building server files...');
    webpack(serverConfig).run(handler.bind(null, serverConfig));
    if (process.env.PERSIST_QUERIES === 'true') {
      buildPersistedQueries();
    }
  });
});
