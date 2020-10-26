import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
//import {createLogger} from "redux-logger";
import thunkMiddleware from "redux-thunk";

import * as serviceWorker from './serviceWorker';

// Route components
import App from "./containers/App";

// Redux
import rootReducer from "./redux/reducers";

// CSS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

//const loggerMiddleware = createLogger();

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
    //loggerMiddleware
  )
);

render(
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
