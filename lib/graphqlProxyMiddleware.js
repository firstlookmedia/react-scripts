const httpProxy = require('http-proxy');
const url = require('url');

// graphql proxy for the client app

// USAGE
//
// app.use('/graphql', graphqlProxyMiddleware(GRAPHQL_ORIGIN));
const proxy = httpProxy.createProxyServer();

const proxycb = (err) => {
  console.error('proxy error:', err); // this prevents crash
};

module.exports = (graphqlOrigin) => {
  const target = url.parse(graphqlOrigin);
  const headers = { host: target.host };
  const proxyOptions = { target, headers };
  return (req, res) => proxy.web(req, res, proxyOptions, proxycb);
};
