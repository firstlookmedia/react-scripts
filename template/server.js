import express from 'express';
import fs from 'fs';
import _ from 'lodash';
import React from 'react';
import { match, RouterContext } from 'react-router';
import path from 'path';
import compression from 'compression';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import envConfig from 'env-config';
import Relay from 'react-relay';
import manifest from 'react-scripts/lib/manifest';
import etag from 'react-scripts/lib/etag';
import assetMiddleware from 'react-scripts/lib/assetMiddleware';
import errorHandlerMiddleware from 'react-scripts/lib/errorHandlerMiddleware';
import defaultHeadersMiddleware from 'react-scripts/lib/defaultHeadersMiddleware';
import DataProvider from './src/components/DataProvider';

import redirects from './redirects.json';

const APP_PORT = process.env.APP_PORT || 3232;

envConfig.register({
  ORIGIN: process.env.ORIGIN || `http://localhost:${APP_PORT}`,
});

const routes = require('./src/routes').default;

const app = express();
app.use(compression());
app.set('etag', etag);
app.use('/assets', assetMiddleware);
app.use(express.static('public'));
app.use(defaultHeadersMiddleware);

app.get('*', (req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      next(err);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      Promise.resolve({
        data: { foo: 'Simulated data fetching' },
        renderProps,
      }).then(render).catch(next); // eslint-disable-line no-use-before-define
    } else {
      res.sendStatus(404);
    }
  });

  function render({ data, renderProps }) {
    const reactOutput = ReactDOMServer.renderToString(
      <DataProvider data={data}>
        <RouterContext {...renderProps} />
      </DataProvider>
    );
    const head = Helmet.rewind();
    res.status(200).send(`<!doctype html>
<html>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}

    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <link href="/assets/${manifest['main.css']}" type="text/css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${reactOutput}</div>
    <script id="preloadedData" type="application/json">
      ${JSON.stringify(data)}
    </script>
    ${envConfig.renderScriptTag()}
    <script type="text/javascript" src="/assets/${manifest['main.js']}"></script>
    ${head.script.toString()}
  </body>
</html>`);
  }
});

app.use(errorHandlerMiddleware);

app.listen(APP_PORT, (err) => {
  if (err) {
    return console.error(err.message || err);
  }
  return console.log(`Server started on port ${APP_PORT}`);
});
