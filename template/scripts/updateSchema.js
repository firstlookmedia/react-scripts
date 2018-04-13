const utils = require('graphql/utilities');
const request = require('sync-request');
const fs = require('fs');
const path = require('path');

const introspectionQuery = utils.introspectionQuery;
const buildClientSchema = utils.buildClientSchema;
const printSchema = utils.printSchema;

const GRAPHQL_ORIGIN = process.env.GRAPHQL_ORIGIN || 'http://localhost:3002';

const resp = request('POST', `${GRAPHQL_ORIGIN}/graphql`, {
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ query: introspectionQuery }),
}).getBody();

fs.writeFileSync(path.join(__dirname, '../schema.json'), resp);

fs.writeFileSync(
  path.join(__dirname, '../schema.graphql'),
  printSchema(buildClientSchema(JSON.parse(resp).data))
);
