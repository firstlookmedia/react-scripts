const fs = require('fs');
const path = require('path');

const queryMap = require('../../../complete.queryMap.json');

const BASE_DIR = path.resolve('build/assets');

module.exports = (log = false) => {
  try {
    Object.keys(queryMap).forEach((key) => {
      fs.writeFileSync(`${BASE_DIR}/${key}.query`, queryMap[key]);
    });
    if (log) console.log('Persisted queries built');
  } catch (e) {
    console.error('Persisted queries build step failed:', e);
  }
};
