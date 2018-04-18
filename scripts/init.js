'use strict';
const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const chalk = require('chalk');

module.exports = (appPath, appName, verbose, originalDirectory) => {
  console.log(`options ${appPath}`);

  const ownPackageName = require(path.join(__dirname, '..', 'package.json')).name;
  const ownPath = path.join(appPath, 'node_modules', ownPackageName);
  const appPackage = require(path.join(appPath, 'package.json'));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};
  appPackage.devDependencies = appPackage.devDependencies || {};

  // Setup the script rules
  appPackage.scripts = {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
    'start-production': 'NODE_ENV=production node ./build/server.js',
    'update-schema': 'node scripts/updateSchema.js',
  };

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  // Copy the files for the user
  const templatePath = path.join(ownPath, 'template');
  fs.copySync(templatePath, appPath);

  let args = ['add', 'react', 'react-dom'];

  // Install additional template dependencies, if present
  const templateDependenciesPath = path.join(appPath, '.template.dependencies.json');
  if (fs.existsSync(templateDependenciesPath)) {
    const templateDependencies = require(templateDependenciesPath).dependencies;
    args = args.concat(Object.keys(templateDependencies).map(key => {
      const version = templateDependencies[key];
      if (version.indexOf('git+') === 0) {
        return version;
      }
      return `${key}@${version}`;
    }));
    fs.unlinkSync(templateDependenciesPath);
  }

  const command = 'yarn';
  const proc = spawn(command, args, { stdio: 'inherit' });
  proc.on('close', (code) => {
    if (code !== 0) {
      console.error('`' + command + ' ' + args.join(' ') + '` failed');
      return;
    }

    // Display the most elegant way to cd.
    // This needs to handle an undefined originalDirectory for
    // backward compatibility with old global-cli's.
    let cdpath;
    if (originalDirectory &&
        path.join(originalDirectory, appName) === appPath) {
      cdpath = appName;
    } else {
      cdpath = appPath;
    }

    console.log();
    console.log('Success! Created ' + appName + ' at ' + appPath);
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan('  ' + command + ' start'));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan('  ' + command + ' run build'));
    console.log('    Bundles the app into static files for production.');
    console.log();
    console.log(chalk.cyan('  ' + command + ' test'));
    console.log('    Starts the test runner.');
    console.log();
    console.log(chalk.cyan('  ' + command + ' update-schema'));
    console.log('    Updates the graphql schema. Set GRAPHQL_ORIGIN to ' +
                'your local graphql server. e.g. \n' +
                '      $ GRAPHQL_ORIGIN=http://localhost:4000 ' + command +
                ' update-schema');
    console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log(chalk.cyan('  cd'), cdpath);
    console.log('  ' + chalk.cyan('git init'));
    console.log('  ' + chalk.cyan(command + ' update-schema'));
    console.log('  ' + chalk.cyan(command + ' start'));
    console.log();
    console.log('Happy hacking!');
  });
};
