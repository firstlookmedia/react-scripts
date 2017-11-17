const basicAuth = require('basic-auth');

const BASIC_AUTH_USER = process.env["BASIC_AUTH_USER"];
const BASIC_AUTH_PASS = process.env["BASIC_AUTH_PASS"];

// middleware to put app behind basic auth.
//
// Set BASIC_AUTH_USER in env to username you want.
// Set BASIC_AUTH_PASS in env to md5 digest of pw you want.
module.exports = (req, res, next) => {
  if (req._bypassAuth) return next();
  if (typeof BASIC_AUTH_USER !== 'string') return next();
  const auth = basicAuth(req);
  if (auth) {
    const { name, pass } = auth;
    const hash = crypto.createHash('md5').update(pass).digest('hex');
    if (BASIC_AUTH_USER === name && BASIC_AUTH_PASS === hash) {
      return next();
    }
  }
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
};
