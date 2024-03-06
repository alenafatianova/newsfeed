import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { App } from './App/App'
import { Provider } from 'react-redux'
import { store } from './store'
import { NetworkStatusContextProvider } from '@features/networkStatusContext/NetworkStatusContextProvider'
import { initI18n } from '@features/locale/utils'
import * as Sentry from '@sentry/react'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() => console.log('service worker is ready'))
    .catch(() => console.log('some error has occured'))
}

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://851bdf0f7fc5258713184733101fb02b@o4506863370371072.ingest.us.sentry.io/4506863375286272',
  })
}

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
