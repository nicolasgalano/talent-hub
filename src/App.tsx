import React from 'react';

import Routes from './routes/Routes';

// import './assets/fonts/SFUIDisplay-Semibold.eot'
// import './assets/fonts/SFUIDisplay-Semibold.woff2'
// import './assets/fonts/SFUIDisplay-Semibold.woff'
// import './assets/fonts/SFUIDisplay-Semibold.ttf'
// import './assets/fonts/SFUIDisplay-Semibold.svg'

function App(): JSX.Element {
  return (
    <React.Suspense fallback={<></>}>
      <Routes />
    </React.Suspense>
  )
}

export default App;
