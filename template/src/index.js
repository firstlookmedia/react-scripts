import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import React from 'react';
import ReactDOM from 'react-dom';
import envConfig from 'env-config';
import { ClientFetcher } from './fetcher';

import './globals.css';

const root = document.getElementById('root');

envConfig.hydrate();

const renderApp = async () => {
  const {
    createResolver,
    historyMiddlewares,
    render,
    routeConfig,
  } = require('./routes');

  // eslint-disable-next-line no-underscore-dangle
  const fetcher = new ClientFetcher('/graphql', window.__RELAY_PAYLOADS__);
  const resolver = createResolver(fetcher);

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig,
    resolver,
    render,
  });

  ReactDOM.hydrate(<Router resolver={resolver} />, root);
};

renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.unmountComponentAtNode(root);
    renderApp();
  });
}
