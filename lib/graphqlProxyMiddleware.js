const httpProxy = require('http-proxy');

// graphql proxy for the client app

// USAGE
//
// app.use('/graphql', graphqlProxyMiddleware(GRAPHQL_ORIGIN));

const proxy = httpProxy.createProxyServer();

module.exports = (graphqlOrigin) => (req, res) => {
  proxy.web(req, res, { target: graphqlOrigin }, err => {
    // Somehow signal that this specific error occured.
    if (err.code === 'ENOTFOUND') res.status(599).send('Offline');

    console.error(err); // this prevents crash
  });
};
