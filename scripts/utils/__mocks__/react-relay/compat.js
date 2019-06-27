const Relay = require('react-relay/compat');

Relay.createFragmentContainer = component => component;

Relay.QueryRenderer = ({ render }) => render({ props: {}, error: null });

module.exports = Relay;
