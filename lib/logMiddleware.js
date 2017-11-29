'use strict'

const morgan = require('morgan')

// This adds a very simple log message for each request. Morgan is a package
// from express to do this, and we use tiny so we don't record any user
// information to logs in production.
//
// TODO: Add a different log format for dev & staging that provides more
// information for debugging.
module.exports = morgan('tiny')
