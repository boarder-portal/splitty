import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'client/components/Home/Home';
import Room from 'client/components/Room';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/room/:roomId">
        <Room />
      </Route>
    </Switch>
  );
};

export default App;
