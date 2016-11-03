// SEE HERE
// https://github.com/facebook/relay/issues/161#issuecomment-134324986

// we use webpack to mock relay containers so they
// pass through props

// eslint-disable-next-line
const Relay = require('real-react-relay');

module.exports = {
  QL: Relay.QL,
  Mutation: Relay.Mutation,
  Route: Relay.Route,
  createContainer: (component) => component,
};
