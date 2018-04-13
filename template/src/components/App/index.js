import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import styles from './styles.css';

const App = ({ viewer }) => (
  <div className={styles.container}>
    <h1>Hello {viewer.id}!</h1>
    <p>Try updating this text or the styles to see hot-reload in action</p>
  </div>
);

export default createFragmentContainer(App, {
  viewer: graphql`fragment App_viewer on Viewer {
    id
  }`,
});
