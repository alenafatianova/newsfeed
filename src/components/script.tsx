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
import { initI18n } from '@features/locale/utils'
import { Error } from './Error/Error'

const firebaseApp = initializeAPI()

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
          <AuthContextProvider firebaseApp={firebaseApp}>
            <Router>
              <App />
            </Router>
          </AuthContextProvider>
        </NetworkStatusContextProvider>
      </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
  )
})
