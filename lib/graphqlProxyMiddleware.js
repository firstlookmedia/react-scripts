const httpProxy = require('http-proxy');

// graphql proxy for the client app

// USAGE
//
// app.use('/graphql', graphqlProxyMiddleware(GRAPHQL_ORIGIN));

const proxy = httpProxy.createProxyServer();

module.exports = (graphqlOrigin) => (req, res) => {
  console.log(req.body);

  proxy.web(req, res, { target: graphqlOrigin }, err => {
    console.error(err);
    // don't crash plz
  });
};
