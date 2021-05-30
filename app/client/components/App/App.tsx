import { h, FunctionalComponent } from 'preact';
import block from 'bem-cn';
import { Switch, Route, Link } from 'react-router-dom';

import './App.scss';

const b = block('App');

const App: FunctionalComponent = () => {
  return (
    <div className={b()}>
      Hello world

      <Link to="/">Home link</Link>
      <Link to="/about">About link</Link>

      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>

        <Route path="/about">
          <div>About</div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
