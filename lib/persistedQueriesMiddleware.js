const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const projectName = require(path.join(process.cwd(), 'package.json')).name;
const s3Bucket = process.env.ASSETS_S3_BUCKET;

module.exports = () => {
  const queryMap = new Map();
  const assetsBase = s3Bucket ? `${s3Bucket}/${projectName}/assets` : path.resolve('build/assets');

  return async (req, res, next) => {
    if (req.body && req.body.id && !req.body.query) {
      try {
        let queryText = queryMap.get(req.body.id);
        if (!queryText) {
          queryText = await readFile(`${assetsBase}/${req.body.id}.query`, 'utf8');
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
