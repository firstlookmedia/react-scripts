const jest = require('jest');

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

const createJestConfig = require('./utils/createJestConfig');
const path = require('path');

argv.push(
  '--config',
  JSON.stringify(createJestConfig())
);

jest.run(argv);
