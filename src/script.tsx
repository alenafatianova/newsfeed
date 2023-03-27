import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeAPI } from './api';
import './common.css';
import { App } from './components/App/App';

initializeAPI();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
