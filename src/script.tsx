import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { initializeAPI } from './app/api';
// import { AuthContextProvider } from './features/auth/AuthContextProvider';
import { store } from '@app/store';

import { App } from './app/components/App/App';
import '@app/common.css';

// const firebaseApp = initializeAPI();

initializeAPI();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
