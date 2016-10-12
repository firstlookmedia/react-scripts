// standard error handler middleware.

// USAGE
// (this should be included at the bottom of server.js)
//
// app.use(errorHandlerMiddleware);

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack || err.message || err);
  if (err.statusCode) {
    return res.sendStatus(err.statusCode);
  }
  return res.sendStatus(500);
};
