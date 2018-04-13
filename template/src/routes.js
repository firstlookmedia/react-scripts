import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import React from 'react';
import { graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import App from './components/App';

export const historyMiddlewares = [queryMiddleware];

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}

// eslint-disable-next-line function-paren-newline
export const routeConfig = makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={graphql`
      query routes_App_Query {
        viewer {
          ...App_viewer
        }
      }
      `}
  />,
);

export const render = createRender({});
