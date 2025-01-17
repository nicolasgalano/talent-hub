import React from 'react';

import Routes from './routes/Routes';

function App(): JSX.Element {
  return (
    <React.Suspense fallback={<></>}>
      <Routes />
    </React.Suspense>
  )
}

export default App;
