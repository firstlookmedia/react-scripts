const webpack = require('webpack');
const fs = require('fs');
const spawn = require('cross-spawn');
const path = require('path');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const httpProxy = require('http-proxy');
const config = require('../config/webpack.devserver');
const serverConfig = require('../config/webpack.server');

const app = express();

const compiler = webpack(config);

app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  stats: 'minimal',
}));

app.use(WebpackHotMiddleware(compiler));

// since the devserver config uses style-loader, we don't want to serve the
// extracted main.css, and without this line the browser hangs when asking the
// dev server for main.css & never times out
app.get('/assets/main.css', (req, res) => { res.status(404).send('not found') });

const APP_PORT = process.env.APP_PORT || 3232;

// proxy everything to app server except webpack output
const proxy = new httpProxy.createProxyServer();
app.all('*', (req, res) => {
  if (!new RegExp(`^${config.output.publicPath}`).test(req.path)) {
    proxy.web(req, res, {target: `http://localhost:${APP_PORT}`}, (err) => {
      res.send("App server is down, but it may just be restarting");
    });
  }
});

const PORT = process.env.PORT || 3233;

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Dev server is listening on port ${PORT} and proxying to app server`);
});

const serverCompiler = webpack(Object.assign({}, serverConfig));
const serverPath = path.resolve('build/server.js');

var child;

function startServer() {
  child = spawn('node', [serverPath], { stdio: 'inherit' });
}

function restartServer() {
  if (child) {
    child.on('close', (code, signal) => {
      startServer();
    });
    child.kill();
  } else {
    startServer();
  }
}

console.log('Compiling server build... this will take a while...');
serverCompiler.watch({ poll: 1000 }, (err, stats) => {
  if (err) {
    console.error(err.message || err);
  }
  if (stats.hasErrors()) {
    console.log(stats.toString("errors-only"));
  } else {
    console.log('Starting new server...');
    restartServer();
  }
});
