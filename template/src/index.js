import React from 'react';
import ReactDOM from 'react-dom';
import { match, Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import envConfig from 'env-config';
import DataProvider from './components/DataProvider';

import './globals.css';

envConfig.hydrate();

const preloadedData = JSON.parse(document.getElementById('preloadedData').textContent);

const render = applyRouterMiddleware(
  useScroll()
);

const rootElement = document.getElementById('root');

function renderApp() {
  // eslint-disable-next-line global-require
  const routes = require('./routes').default;

  match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    if (error) return console.error(error);
    if (redirectLocation) return console.error(redirectLocation);
    ReactDOM.render(
      <DataProvider data={preloadedData}>
        <Router {...renderProps} render={render} />
      </DataProvider>,
      rootElement,
    );
    return;
  });
}

renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.unmountComponentAtNode(root);
    renderApp();
  });
}
