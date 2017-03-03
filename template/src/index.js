import './globals.css';

const rootElement = document.getElementById('root');

const renderApp = () => {
  // require again after hot-reload
  const App = require('./components/App').default;

  // this is just for demonstration
  App.init(rootElement);
};

renderApp();

module.hot.accept('./components/App', () => {
  renderApp();
});
