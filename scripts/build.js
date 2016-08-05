'use strict';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const filesize = require('filesize');
const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size').sync;
const chalk = require('chalk');
const clientConfig = require('../config/webpack.client.prod');
const serverConfig = require('../config/webpack.server');

function printFileSizes(stats, config) {
  const outputPath = config.output.path;
  const assets = stats
    .toJson().assets
    .map(asset => {
      const fileContents = fs.readFileSync(path.join(outputPath, asset.name));
      const size = gzipSize(fileContents);
      return {
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size),
      };
    });
  assets.sort((a, b) => b.size - a.size);
  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map(a => a.sizeLabel.length)
  );
  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel;
    const sizeLength = sizeLabel.length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    const dirname = path.relative('', outputPath);
    console.log(
      '  ' + sizeLabel +
      '  ' + chalk.dim(dirname + path.sep) + chalk.cyan(asset.name)
    );
  });
}


function handler(config, err, stats) {
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }
  if (stats.hasErrors()) {
    console.log(stats.toString('errors-only'));
  } else {
    printFileSizes(stats, config);
  }
}

console.log('Building optimized assets...');
webpack(clientConfig).run((err, stats) => {
  handler(clientConfig, err, stats);

  console.log();
  console.log('Building server files...');
  webpack(serverConfig).run(handler.bind(null, serverConfig));
});
