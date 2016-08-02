# react-scripts

This provides configuration for FLM's isomorphic React apps.

## Install

Create a new npm project and install:

`npm install --save git+ssh://git@github.com:firstlookmedia/react-scripts.git#v0.2`

## Usage

This expects the following files:

```
src/index.js  # entry to the client-side app
server.js     # entry to the server
```

The output will become:

```
build/server.js             # compiled server
build/manifest.json         # manifest pointing source files to compiled
build/assets/32f2q8fj3.js   # example compiled app
build/assets/2d0823jd.css   # any other compiled assets (css, images, fonts)
```

---

`react-scripts` provides the npm script `react-scripts`. Put this in your app's `"scripts"` section:

#### `react-scripts start`

Starts the development environment:

- The app server, which auto-reloads on [http://localhost:3232](http://localhost:3232)
- A webpack dev server, which hot-reloads and proxies requests to the app server,
  on [http://localhost:3233](http://localhost:3233)

#### `react-scripts build`

Builds the production assets to the `build` folder.


