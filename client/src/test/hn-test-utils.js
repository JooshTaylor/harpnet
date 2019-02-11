import React from 'react'
import {
  Router,
  createMemorySource,
  createHistory,
  LocationProvider
} from '@reach/router'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { render, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'

const middleware = [thunk]
const store = createStore(rootReducer, applyMiddleware(...middleware))

// react-testing-library compatibility with Redux
function renderWithRedux(ui) {
  const utils = render(<Provider store={store}>{ui}</Provider>)
  const finishLoading = () => {
    wait(() => expect(utils.queryByAltText('Loading...')).toBeNull())
  }
  return {
    ...utils,
    finishLoading
  }
}

// react-testing-library compatibility with reach-router and redux
// function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
//   const utils = render(
//     <Provider store={store}>
//       <Router>{ui}</Router>
//     </Provider>,
//     renderOptions
//   )
//   const finishLoading = () =>
//     wait(() => expect(utils.queryByAltText('Loading...')).toBeNull())
//   return {
//     ...utils,
//     finishLoading
//   }
// }

function renderWithRouter(ui, options = {}) {
  const { pathname = '/' } = options
  let history = createHistory(createMemorySource(pathname))
  const utils = render(
    <Provider store={store}>
      <LocationProvider history={history}>
        <Router>{ui}</Router>
      </LocationProvider>
    </Provider>
  )
  const finishLoading = () =>
    wait(() => expect(utils.queryByAltText('Loading...')).toBeNull())
  return {
    ...utils,
    finishLoading,
    history
  }
}

export { wait, render, cleanup, fireEvent } from 'react-testing-library'
export { renderWithRouter, renderWithRedux }
