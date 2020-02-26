import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from 'client/components/App/App';

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    setTimeout(() => location.reload(), 400);
  });
}

const client = new ApolloClient({
  uri: 'http://dev.splitty.ru:4000'
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector('#root')
);
