import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { Normalize } from 'styled-normalize';

import Home from 'client/components/Home/Home';
import Room from 'client/components/Room/Room';
import Header from 'client/components/Header/Header';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Trebuchet MS, Helvetica, sans-serif;
  }

  h1 {
    font-size: 100%;
    margin: 0;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <Reset />
      <Normalize />
      <GlobalStyle />

      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/room/:roomId">
          <Room />
        </Route>
      </Switch>
    </>
  );
};

export default App;
