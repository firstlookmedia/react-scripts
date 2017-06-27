// sets default headers for all responses

// USAGE
// (should come AFTER any express.static middleware, including
//  react-scripts/lib/assetMiddleware)
//
// app.use(defaultHeadersMiddleware);

module.exports = (req, res, next) => {
  res.set({
    // this should come after express.static otherwise it overrides
    'Cache-Control': 'max-age=300',

    // https://observatory.mozilla.org/ for recommended settings
    'Strict-Transport-Security': 'max-age=15768000; includeSubDomains; preload',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN'
  });
  next();
};
