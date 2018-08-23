const httpProxy = require('http-proxy');
const url = require('url');

// graphql proxy for the client app

// USAGE
//
// app.use('/graphql', graphqlProxyMiddleware(GRAPHQL_ORIGIN));
const proxy = httpProxy.createProxyServer();

// restream parsed body before proxying
proxy.on('proxyReq', (proxyReq, req) => {
  if (!req.body || !Object.keys(req.body).length) {
    return;
  }

  const contentType = proxyReq.getHeader('Content-Type');
  let bodyData;

  if (contentType === 'application/json') {
    bodyData = JSON.stringify(req.body);
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
  const target = url.parse(graphqlOrigin);
  const headers = { host: target.host };
  const proxyOptions = { target, headers };
  return (req, res) => proxy.web(req, res, proxyOptions, proxycb);
};
