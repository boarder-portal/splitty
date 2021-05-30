import { h, FunctionalComponent } from 'preact';
import block from 'bem-cn';

import './App.scss';

const b = block('App');

const App: FunctionalComponent = () => {
  return (
    <div className={b()}>
      Hello world
    </div>
  );
};

export default App;
