import React from "react";
import {
  Router,
  LocationProvider,
  createHistory,
  createMemorySource
} from "@reach/router";
import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, wait } from "react-testing-library";
import "jest-dom/extend-expect";

const middleware = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleware));

// react-testing-library compatibility with Redux
function renderWithRedux(ui) {
  const utils = render(<Provider store={store}>{ui}</Provider>);
  const finishLoading = () => {
    wait(() => expect(utils.queryByAltText("Loading...")).toBeNull());
  };
  return {
    ...utils,
    finishLoading
  };
}

// react-testing-library compatibility with reach-router and redux
function renderWithRouter(ui, { route = "/", ...renderOptions } = {}) {
  let history = createHistory(window);
  const utils = render(
    <Provider store={store}>
      <LocationProvider history={history}>{ui}</LocationProvider>
    </Provider>,
    renderOptions
  );
  const finishLoading = () =>
    wait(() => expect(utils.queryByAltText("Loading...")).toBeNull());
  return {
    ...utils,
    finishLoading
  };
}

export { wait, render, cleanup, fireEvent } from "react-testing-library";
export { renderWithRouter, renderWithRedux };
