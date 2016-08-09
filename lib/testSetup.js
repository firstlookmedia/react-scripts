const jsdom = require('jsdom');
const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const sinonChai = require('sinon-chai');

global.document = jsdom.jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js',
};

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

chai.use(chaiEnzyme());
chai.use(sinonChai);
