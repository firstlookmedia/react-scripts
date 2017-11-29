'use strict';

const morgan = require('morgan');

// This adds a very simple log message for each request. Morgan is a package
// from express to do this, and we don't want to record any user information to
// logs in production.
//
// TODO: Add a different log format for dev & staging that provides more
// information for debugging.
//
// Usage:
//   import logMiddleware from 'react-scripts/lib/logMiddleware';
//   app.use(logMiddleware);
module.exports = morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms');
