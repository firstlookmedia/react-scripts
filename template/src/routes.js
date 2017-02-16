import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Homepage from './components/Homepage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage} />
  </Route>
);
