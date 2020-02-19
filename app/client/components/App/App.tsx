import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'client/components/Home/Home';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default App;
