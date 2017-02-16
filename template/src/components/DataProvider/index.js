import React from 'react';

// This is here purely for example of injecting data fetched on the server.
// There are a few ways to do this properly, e.g:
// https://github.com/denvned/isomorphic-relay-router
// https://github.com/RickWong/react-transmit

class DataProvider extends React.Component {
  getChildContext() {
    return { data: this.props.data };
  }
  render() {
    return this.props.children;
  }
}

DataProvider.childContextTypes = { data: React.PropTypes.object };

export default DataProvider;
