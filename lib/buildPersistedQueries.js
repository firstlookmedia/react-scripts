const fs = require('fs');
const path = require('path');

const queryMap = require('../../../complete.queryMap.json');

const BASE_DIR = path.resolve('build/assets');

module.exports = () => {
  try {
    Object.keys(queryMap).forEach((key) => {
      fs.writeFileSync(`${BASE_DIR}/${key}.query`, queryMap[key]);
    });
    console.log('persisted queries built');
  } catch (e) {
    console.log('persisted queries build step failed:', e);
  }
};
