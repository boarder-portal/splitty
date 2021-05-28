import React from 'react';
import { hydrate } from 'react-dom';

import App from 'client/components/App/App';

hydrate(
  <App />,
  document.querySelector('#root'),
);
