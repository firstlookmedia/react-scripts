const express = require('express');
const path = require('path');

// middleware to serve build assets
//
// USAGE
//
// app.use('/assets', assetMiddleware);

module.exports = (req, res, next) => {
  express.static(
    path.resolve('build/assets'),
    { maxAge: '1y', fallthrough: false }
  )(req, res, next);
};
