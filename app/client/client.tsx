import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

import App from 'client/components/App/App';

loadableReady(() => {
  hydrate(
    <App />,
    document.getElementById('root'),
  );
});

