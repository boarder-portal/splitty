import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Home from 'client/components/Home/Home';
import Room from 'client/components/Room/Room';
import Header from 'client/components/Header/Header';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "Round";
    src: url(/font-regular.otf);
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Round";
    src: url(/font-bold.otf);
    font-weight: 900;
    font-style: normal;
  }
  html,
  body {
    min-height: 100%;
  }

  body {
    color: #333;
    font-size: 15px;
    line-height: 20px;

    * {
      font-family: Round, Helvetica, sans-serif;
    }
  }

  h1 {
    font-size: 100%;
    margin: 0;
  }

  button,
  input {
    font-family: inherit;
  }

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const App: React.FC = () => {
  return (
    <>
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
