const Relay = jest.genMockFromModule('react-relay/classic');

Relay.createFragmentContainer = (component) => component;

module.exports = Relay;
