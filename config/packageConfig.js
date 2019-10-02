const path = require('path');

const packageConfig = require(path.resolve('package.json'));

const reactScriptPackageConfig = {
  ...packageConfig['react-scripts'],
};

module.exports = reactScriptPackageConfig;
