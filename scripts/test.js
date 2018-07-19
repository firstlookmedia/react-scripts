const jest = require('jest');

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

const path = require('path');

argv.push(
  '--config',
  path.resolve(__dirname, 'utils', 'jestConfig.js'),
);

jest.run(argv);
