const Relay = require('react-relay');

module.exports = {
  QL: Relay.QL,
  Mutation: Relay.Mutation,
  Route: Relay.Route,
  RootContainer: () => null,
  createContainer: (component) => component,
};
