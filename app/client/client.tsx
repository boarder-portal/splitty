import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'client/setupDayjs';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core/styles';

import App from 'client/components/App/App';

import theme from 'client/theme';

const client = new ApolloClient({
  uri: '/graphql',
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector('#root'),
);
