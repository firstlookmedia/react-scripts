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
2. add `QUERIES_S3_BUCKET` property to all build and deploy circle configs and point it to the s3 bucket where the site's queries live
3. upgrade to the newest version of React scripts that has the `get` and `post` fetcher methods
4. install our forked version of relay compiler: https://github.com/firstlookmedia/relay contains the .tar.gz of the compiler and you refer to it like so in the `package.json`: https://github.com/firstlookmedia/relay/releases/download/v1.5.0-flm.1/relay-compiler-1.5.0-flm.1.tar.gz

Note: persisted queries are always turned off during local development.

### relay compiler

We are using a forked version of relay similar to what the artsy folks are doing. Hopefully, this fork will get merged into relay proper, at which point we won't need to do anything special to get persisted static queries to work. Until then, we will need to stick to relay version `1.5.0` and if we do need to upgrade we'll have to update our fork, rebuild the compiler, and release it. The artsy folks and others have done an excellent job of keeping this fork up to date with subsequent relay releases, so this should not pose much a problem. In fact, it would be great for us to help with merging upstream relay releases into the PR version on the relay repository if necessary.

