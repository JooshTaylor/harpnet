import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from 'styled-components'
import colours from './styles/colours'
import App from './App'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

// const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <>
    <ThemeProvider theme={colours}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </>,
  document.getElementById('root')
)
