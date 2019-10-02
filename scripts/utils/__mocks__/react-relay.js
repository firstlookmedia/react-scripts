const Relay = jest.genMockFromModule('react-relay');

Relay.createFragmentContainer = (component) => component;

Relay.QueryRenderer = ({ render }) => render({ props: {}, error: null });

module.exports = Relay;
