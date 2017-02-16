import React from 'react';
import config from 'env-config';

import styles from './styles.css';

const Homepage = (props, { data }) => (
  <div>
    <h2 className={styles.title}>Homepage route</h2>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

Homepage.contextTypes = { data: React.PropTypes.object };

export default Homepage;
