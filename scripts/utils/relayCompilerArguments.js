const path = require('path');

const packageConfig = require(path.resolve('package.json'));

// relay compiler

let includePaths = ['src/**'];
const excludePaths = ['**/__generated__/**'];
if ('react-scripts' in packageConfig) {
  const moduleName = packageConfig['react-scripts'].sharedComponentModule;
  if (moduleName) {
    includePaths = includePaths.concat(`node_modules/${moduleName}/src/**`);
  }
}
const extensions = ['js', 'jsx', 'ts', 'tsx'];

module.exports = [
  '--src',
  path.resolve('.'),

  '--extensions',
  extensions,

  '--include',
  includePaths,

  '--exclude',
  excludePaths,

  '--schema',
  'schema.json',

  '--language',
  'typescript',

  '--artifactDirectory',
  'src/__generated__',

  process.env.PERSIST_QUERIES ? '--persist' : '',
].reduce((acc, item) => acc.concat(item), []);
