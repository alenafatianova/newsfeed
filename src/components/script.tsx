import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { initializeAPI } from './api'
import './common.css'
import { App } from './App/App'
import { AuthContextProvider } from '../features/auth/AuthContextProvider'
import { Provider } from 'react-redux'
import { store } from './store'
import { NetworkStatusContextProvider } from '@features/networkStatusContext/NetworkStatusContextProvider'

const firebaseApp = initializeAPI()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() => console.log('service worker is ready'))
    .catch(() => console.log('some error has occured'))
}

ReactDOM.render(
  <Provider store={store}>
    <NetworkStatusContextProvider>
      <AuthContextProvider firebaseApp={firebaseApp}>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </NetworkStatusContextProvider>
  </Provider>,
  document.getElementById('root')
)
