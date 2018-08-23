const fs = require('fs');
const path = require('path');

const projectName = require(path.join(process.cwd(), 'package.json')).name;

module.exports = () => {
  const queryMap = new Map();
  const assetsBase =
    `${process.env.ASSETS_S3_BUCKET}/${projectName}/assets` || path.resolve('build/assets');

  return async (req, res, next) => {
    if (req.body && req.body.id && !req.body.query) {
      try {
        let queryText = queryMap.get(req.body.id);
        if (!queryText) {
          queryText = await fs.readFile(`${assetsBase}/${req.body.id}.query`);
          queryMap.set(req.body.id, queryText);
        }
        req.body.query = queryText;
      } catch (e) {
        console.error(e);
        throw new Error(e);
      }
    }
    return next();
  };
};
