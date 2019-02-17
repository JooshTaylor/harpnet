import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import rootReducer from './reducers'
import { createStore, applyMiddleware, Middleware, Store } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware: Middleware<any, any, any>[] = [thunk]

const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

// const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
