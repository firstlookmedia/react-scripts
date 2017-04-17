import styles from './styles.css';

// this is just for demonstration of hot reloading
export default {
  init: (el) => {
    el.innerHTML = `
<div class="${styles.container}">
  <h1>Hello world!</h1>
  <p>Try updating this text or the styles to see hot-reload in action</p>
</div>
`;
  },
};
