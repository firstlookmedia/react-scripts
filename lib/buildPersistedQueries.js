const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve('build/assets');

module.exports = (log = false) => {
  try {
    if (!fs.existsSync(BASE_DIR)) {
      fs.mkdirSync(BASE_DIR);
    }
    const queryMap = JSON.parse(fs.readFileSync(path.resolve('complete.queryMap.json')));
    Object.keys(queryMap).forEach((key) => {
      fs.writeFileSync(`${BASE_DIR}/${key}.query.txt`, queryMap[key]);
    });
    if (log) {
      console.log('Persisted queries built');
    }
  } catch (e) {
    console.error('Persisted queries build step failed:', e);
  }
};
