import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeAPI } from './api';
import './common.css';
import { App } from './components/App/App';
import { AuthContextProvider } from './Features/Auth/AuthContextProvider';

initializeAPI();

ReactDOM.render(
  <AuthContextProvider>
  <Router>
    <App />
  </Router>
  </AuthContextProvider>,
  document.getElementById('root')
);
