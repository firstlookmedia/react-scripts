global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const registerRequireContextHook = require('babel-plugin-require-context-hook/register');

Enzyme.configure({ adapter: new Adapter() });

global.mount = Enzyme.mount;
global.shallow = Enzyme.shallow;

registerRequireContextHook();
