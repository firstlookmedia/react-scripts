global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('node-fetch');

global.mount = Enzyme.mount;
global.shallow = Enzyme.shallow;
