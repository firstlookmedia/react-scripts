const Relay = jest.genMockFromModule('react-relay');

class MockStore {
  reset() {
    this.successResponse = undefined;
  }

  succeedWith(response) {
    this.reset();
    this.successResponse = response;
  }

  failWith(response) {
    this.reset();
    this.failureResponse = response;
  }

  update(callbacks) {
    if (this.successResponse) {
      callbacks.onSuccess(this.successResponse);
    } else if (this.failureResponse) {
      callbacks.onFailure(this.failureResponse);
    }
    this.reset();
  }

  commitUpdate(mutation, callbacks) {
    return this.update(callbacks);
  }

  applyUpdate(mutation, callbacks) {
    return this.update(callbacks);
  }
}

module.exports = {
  QL: Relay.QL,
  Mutation: Relay.Mutation,
  Route: Relay.Route,
  RootContainer: () => null,
  createContainer: (component) => component,
  Store: new MockStore(),
};
