const babelRelayPlugin = require('babel-relay-plugin');
const schema = require('./schema.json');

module.exports = babelRelayPlugin(schema.data);
