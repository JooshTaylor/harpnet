import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GlobalStyles from "./styles/Global";
import App from "./App";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
