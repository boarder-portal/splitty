import React, { useState } from 'react';
import loadable from '@loadable/component';

const HomeLoadable = loadable(() => import('client/components/pages/Home/Home'));

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div
        onClick={() => setCounter((c) => c + 1)}
      >
        Hello worldd
      </div>
      <HomeLoadable />
    </>
  );
};

export default App;
