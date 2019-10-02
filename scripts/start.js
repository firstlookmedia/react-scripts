'use strict';

const webpack = require('webpack');
const spawn = require('cross-spawn');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const httpProxy = require('http-proxy');
const chalk = require('chalk');
const config = require('../config/webpack.client.dev');
const serverConfig = require('../config/webpack.server.dev');
const relayCompilerArguments = require('./utils/relayCompilerArguments');

const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  stats: 'minimal',
}));

app.use(webpackHotMiddleware(compiler));

// since the devserver config uses style-loader, we don't want to serve the
// extracted main.css, and without this line the browser hangs when asking the
// dev server for main.css & never times out
app.get('/assets/main.css', (req, res) => {
  res.status(404).send('not found');
});

const APP_PORT = process.env.APP_PORT || 3232;

// proxy everything to app server except webpack output
const proxy = httpProxy.createProxyServer();
app.all('*', (req, res) => {
  if (!new RegExp(`^${config.output.publicPath}`).test(req.path)) {
    proxy.web(req, res, { target: `http://localhost:${APP_PORT}` }, () => {
      res.send(`<!doctype html>
<html>
<head>
  <style>
    html, body { height: 100%; }
    body {
      background: #e9fff8;
      color: #2b005a;
      font-family: system, -apple-system,
  ".SFNSText-Regular", HelveticaNeue, LucidaGrande;
      font-size: 42px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
    }
  </style>
  <script>
    let i = 0;
    function gradiate() {
      document.body.style.backgroundColor = 'hsl('+ ((i * 2) % 360) + ',100%,96%)';
      i++;
      requestAnimationFrame(gradiate);
    }
    requestAnimationFrame(gradiate);

    setTimeout("location.reload()", 3000);
  </script>
</head>
<body>Building server...</body>
</html>`);
    });
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3233;

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  const url = `http://localhost:${PORT}`;
  return console.log(`
Development server started. Visit ${chalk.bold.green(url)}
`);
});

const serverCompiler = webpack(Object.assign({}, serverConfig));

serverCompiler.watch({ poll: 1000 }, (err, stats) => {
  if (err) {
    console.error(err.message || err);
  }
  if (stats.hasErrors()) {
    console.log(stats.toString('errors-only'));
  }
});

const relayCompiler = spawn(
  path.resolve('./node_modules/.bin/relay-compiler'),
  relayCompilerArguments.concat('--watch'),
  { stdio: 'inherit' },
);

relayCompiler.on('close', code => process.exit(code));

process.on('close', code => relayCompiler.exit(code));
