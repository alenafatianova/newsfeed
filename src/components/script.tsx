import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './common.css'
import { App } from './App/App'
import { Provider } from 'react-redux'
import { store } from './store'
import { NetworkStatusContextProvider } from '../features/networkStatusContext/NetworkStatusContextProvider'
import { initI18n } from '../features/locale/utils'
import { Error } from './Error/Error'
import * as Sentry from '@sentry/react'
import { AuthContextProvider } from '../features/auth/AuthContextProvider'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() => console.log('service worker is ready'))
    .catch(() => console.log('some error has occured'))
}

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      error: false,
    }
  }

  componentDidCatch() {
    this.setState({ error: true })
  }
  render() {
    return this.state.error ? <Error /> : this.props.children
  }
}

initI18n(() => {
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <NetworkStatusContextProvider>
          <Router>
            <App />
          </Router>
        </NetworkStatusContextProvider>
      </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
  )
})
