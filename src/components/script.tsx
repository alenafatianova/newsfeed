import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeAPI } from './api';
import './common.css';
import { App } from './App/App';
import { AuthContextProvider } from '../features/auth/AuthContextProvider';
import { Provider } from 'react-redux';
import { store } from './store';

const firebaseApp = initializeAPI();

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider firebaseApp={firebaseApp}>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);
