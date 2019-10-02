global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

const observeMock = () => null;
global.IntersectionObserver = function IntersectionObserver() {
  return {
    observe: observeMock,
  };
};
global.IntersectionObserverEntry = {
  prototype: { intersectionRatio: {} },
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

global.mount = Enzyme.mount;
global.shallow = Enzyme.shallow;
