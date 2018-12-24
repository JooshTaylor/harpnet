import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import axios from "axios";
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

setInterval(function() {
  axios.get("https://protected-sierra-86012.herokuapp.com/");
}, 300000);

// const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
