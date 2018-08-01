const getBundles = require('react-loadable/webpack');

module.exports = (stats, modules) => {
  const bundles = getBundles(stats, modules);
  const styles = bundles
    .filter(bundle => bundle.file.endsWith('.css'))
    .map(style => `<link href="/assets/${style.file}" type="text/css" rel="stylesheet"/>`)
    .join('\n');
  const scripts = bundles
    .filter(bundle => bundle.file.endsWith('.js'))
    .map(script => `<script type="text/javascript" src="/assets/${script.file}"></script>`)
    .join('\n');

  return {
    styles,
    scripts,
  };
};
