import express from 'express';
import compression from 'compression';
import manifest from 'react-scripts/lib/manifest';
import assetMiddleware from 'react-scripts/lib/assetMiddleware';
import errorHandlerMiddleware from 'react-scripts/lib/errorHandlerMiddleware';
import defaultHeadersMiddleware from 'react-scripts/lib/defaultHeadersMiddleware';

const APP_PORT = process.env.APP_PORT || 3232;

const app = express();
app.use(compression());
app.use('/assets', assetMiddleware);
app.use(express.static('public'));
app.use(defaultHeadersMiddleware);

app.get('*', (req, res) => {
  res.status(200).send(`<!doctype html>
<html>
  <head>
    <title>Hello world</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="/assets/${manifest['main.css']}" type="text/css" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
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
