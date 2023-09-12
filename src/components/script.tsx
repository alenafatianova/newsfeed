import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { App } from './App/App'
import { Provider } from 'react-redux'
import { store } from './store'
import { NetworkStatusContextProvider } from '@features/networkStatusContext/NetworkStatusContextProvider'
import { initI18n } from '@features/locale/utils'

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/serviceWorker.js')
//     .then(() => console.log('service worker is ready'))
//     .catch(() => console.log('some error has occured'))
// }

initI18n(() => {
  ReactDOM.render(
    <Provider store={store}>
      <NetworkStatusContextProvider>
        <Router>
          <App />
        </Router>
      </NetworkStatusContextProvider>
    </Provider>,
    document.getElementById('root')
  )
})
