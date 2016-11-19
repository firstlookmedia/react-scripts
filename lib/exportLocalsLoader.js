const loaderUtils = require('loader-utils');

// this loader exports only the localized classnames created by
// css-loader with 'modules' enabled

module.exports = () => {};
module.exports.pitch = (remainingRequest) => {
  const req = loaderUtils.stringifyRequest(this, `!!${remainingRequest}`);
  return `var content = require(${req});

if (content.locals) module.exports = content.locals;`;
};
