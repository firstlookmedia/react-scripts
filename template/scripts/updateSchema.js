const utils = require('graphql/utilities');
const request = require('sync-request');
const fs = require('fs');
const path = require('path');

const introspectionQuery = utils.introspectionQuery;
const buildClientSchema = utils.buildClientSchema;
const printSchema = utils.printSchema;

const resp = request('POST', 'http://localhost:3002/graphql', {
  headers: {
    'content-type': 'application/graphql',
  },
  body: introspectionQuery,
}).getBody();

fs.writeFileSync(
  path.join(__dirname, '../schema.json'),
  resp
);

fs.writeFileSync(
  path.join(__dirname, '../schema.graphql'),
  printSchema(buildClientSchema(JSON.parse(resp).data))
);
