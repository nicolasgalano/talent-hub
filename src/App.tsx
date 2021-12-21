import React from 'react';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Routes
import Routes from './routes/Routes'; 

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <React.Suspense fallback={<></>}>
        <Routes />
      </React.Suspense>
    </Provider>
  )
}
export default App;
