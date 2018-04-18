const path = require('path');

const packageConfig = require(path.resolve('package.json'));

// relay compiler

let includePaths = ['src/**'];
let excludePaths = ['**/__generated__/**'];
if ('react-scripts' in packageConfig) {
  const moduleName = packageConfig['react-scripts'].sharedComponentModule;
  if (moduleName) {
    includePaths = includePaths.concat(`node_modules/${moduleName}/src/**`);
  }
}

module.exports = [
  '--src',
  path.resolve('.'),

  '--include',
  includePaths,

  '--exclude',
  excludePaths,

  '--schema',
  'schema.json',
].reduce((acc, item) => acc.concat(item), []);
