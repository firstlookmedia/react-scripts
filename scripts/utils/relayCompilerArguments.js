const path = require('path');
const packageConfig = require('../../config/packageConfig.js');

// relay compiler

let includePaths = ['src/**'];
const excludePaths = ['**/__generated__/**'];
const moduleName = packageConfig.sharedComponentModule;
if (moduleName) {
  includePaths = includePaths.concat(`node_modules/${moduleName}/src/**`);
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

  process.env.PERSIST_QUERIES ? '--persist --persist-output' : '',
].reduce((acc, item) => acc.concat(item), []);
