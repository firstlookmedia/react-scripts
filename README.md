# firstlookmedia/react-scripts

Provides configuration for universal React/Relay apps.

By default we expect a graphql server to exist as a separate service.
The default template will query for `{ viewer { id } }` but this is not
required of the schema.

## Install

``` bash
npm install -g create-react-app

create-react-app --scripts-version=git+ssh://git@github.com/firstlookmedia/react-scripts.git my-app
cd my-app
yarn update-schema
yarn start
```

## Usage

`react-scripts` expects at least the following files:

```
src/index.js    # entry to the client-side app
server.js       # entry to the server
schema.graphql  # your graphql schema
```

The output will become:

```
build/server.js             # compiled server
build/manifest.json         # manifest pointing source files to compiled
build/assets/32f2q8fj3.js   # example compiled app
build/assets/2d0823jd.css   # any other compiled assets (css, images, fonts)
```

---

#### `yarn start`

Starts the development environment:

- The app server, which auto-reloads on [http://localhost:3232](http://localhost:3232)
- A webpack dev server, which hot-reloads and proxies requests to the app server,
  on [http://localhost:3233](http://localhost:3233)

#### `yarn build`

Builds the production assets to the `build` folder.

#### `yarn test`

Runs jest tests. `react-scripts` will look for any file named `__spec.js`.

You will need `watchman` to use `yarn test` without `CI=true`.
To install on OSX `brew bundle` in this directory.

## Persisted queries

By default, sites will not persist static queries. To enable persisted queries:

1. add `PERSIST_QUERIES: "true"` to all build circle configs
2. add `QUERIES_S3_BUCKET: "queries.[dev|staging|prod].flmcloud.net"`to all build circle configs
3. upgrade to the newest version of React scripts that has the `get` and `post` fetcher methods

Note: persisted queries are always turned off during local development.
