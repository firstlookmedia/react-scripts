// middleWare to whitelist IPs from basic auth.
//
// NOTE: for ip bypass to work, you need to make sure you have before this
// middleware: app.set('trust proxy', true);
//
// Set IP_BYPASS as a comma seperated list of IPs in env to whitelist.
module.exports = (req, res, next) => {
  let IP_BYPASS = process.env["IP_BYPASS"];
  let ips = typeof IP_BYPASS === 'string' ? IP_BYPASS.split(',') : null;
  if (typeof IP_BYPASS === 'string') {
    if (ips.indexOf(req.ip) >= 0) {
      req._bypassAuth = true; // eslint-disable-line no-param-reassign
    }
  }
  next();
};
