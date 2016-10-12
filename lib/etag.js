const crypto = require('crypto');

// TODO
// this hacks around Relay sending incremental IDs, see:
// https://github.com/facebook/relay/blob/master/src/query/generateConcreteFragmentID.js
// we should file a bug and get them to fix this.

// USAGE
//
// app.set('etag', etag);

module.exports = (body) => {
  const bodyStr = body.toString();
  const bodyExcludingRelay = bodyStr.substring(0, bodyStr.indexOf(
    '<script id="preloadedData" type="application/json">'
  ));
  const hash = crypto.createHash('md5').update(bodyExcludingRelay).digest('hex');
  return `W/"${hash}"`;
};
