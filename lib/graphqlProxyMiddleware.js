const httpProxy = require('http-proxy');
const url = require('url');
const fs = require('fs');
const path = require('path');

// graphql proxy for the client app

// USAGE
//
// app.use('/graphql', graphqlProxyMiddleware(GRAPHQL_ORIGIN));
const proxy = httpProxy.createProxyServer();

// restream parsed body before proxying
proxy.on('proxyReq', (proxyReq, req, res, options) => {
  if (!req.body || !Object.keys(req.body).length) {
    return;
  }

  const contentType = proxyReq.getHeader('Content-Type');
  let bodyData;

  if (contentType === 'application/json') {
    bodyData = JSON.stringify(req.body);
  }

  if (contentType === 'application/x-www-form-urlencoded') {
    bodyData = queryString.stringify(req.body);
  }

  if (bodyData) {
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
});

const proxycb = (err) => {
  console.error('proxy error:', err); // this prevents crash
};

module.exports = (graphqlOrigin) => {
  const queryMap = new Map();
  const target = url.parse(graphqlOrigin);
  const headers = { host: target.host };
  const proxyOptions = { target, headers };
  const assetsBaseDir = process.env.ASSETS_S3_BUCKET || path.resolve('build/assets');
  return (req, res) => {
    if (req.body && req.body.id && !req.body.query) {
      try {
        if (!queryMap.get(req.body.id)) {
          const queryText = fs.readFileSync(`${assetsBaseDir}/${req.body.id}.query`);
          queryMap.set(req.body.id, queryText);
        }
        req.body.query = queryMap.get(req.body.id);
      } catch (e) {
        console.error(e);
        throw new Error(e);
      }
    }
    return proxy.web(req, res, proxyOptions, proxycb);
  };
};
