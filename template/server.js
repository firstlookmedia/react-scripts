import express from 'express';
import compression from 'compression';
import ReactDOMServer from 'react-dom/server';
import manifest from 'react-scripts/lib/manifest';
import assetMiddleware from 'react-scripts/lib/assetMiddleware';
import errorHandlerMiddleware from 'react-scripts/lib/errorHandlerMiddleware';
import defaultHeadersMiddleware from 'react-scripts/lib/defaultHeadersMiddleware';
import graphqlProxyMiddleware from 'react-scripts/lib/graphqlProxyMiddleware';
import { getFarceResult } from 'found/lib/server';
import serialize from 'serialize-javascript';
import 'babel-polyfill';
import { ServerFetcher } from './src/fetcher';
import {
  createResolver,
  historyMiddlewares,
  render,
  routeConfig,
} from './src/routes';

const {
  APP_PORT = 3232,
  GRAPHQL_ORIGIN = 'http://localhost:3002',
  GRAPHQL_PATH = '/graphql',
} = process.env;

const GRAPHQL_URL = `${GRAPHQL_ORIGIN}${GRAPHQL_PATH}`;

const app = express();
app.use(compression());
app.use('/assets', assetMiddleware);
app.use(express.static('public'));
app.use(defaultHeadersMiddleware);
app.use('/graphql', graphqlProxyMiddleware(GRAPHQL_URL));

app.get('*', async (req, res) => {
  const fetcher = new ServerFetcher(GRAPHQL_URL);

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: createResolver(fetcher),
    render,
  });

  if (redirect) {
    res.redirect(302, redirect.url);
    return;
  }

  res.status(status).send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello world</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="/assets/${manifest['main.css']}" type="text/css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${ReactDOMServer.renderToString(element)}</div>
    <script>
      window.__RELAY_PAYLOADS__ = ${serialize(fetcher, { isJSON: true })}
    </script>
    <script type="text/javascript" src="/assets/${manifest['main.js']}"></script>
  </body>
</html>`);
});

app.use(errorHandlerMiddleware);

app.listen(APP_PORT, (err) => {
  if (err) {
    return console.error(err.message || err);
  }
  return console.log(`Server started on port ${APP_PORT}`);
});
