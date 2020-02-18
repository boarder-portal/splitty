import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from 'client/components/App/App';

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    setTimeout(() => location.reload(), 300)
  });
}

const client = new ApolloClient({
  uri: 'http://dev.splitty.ru:4000'
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#root')
);
