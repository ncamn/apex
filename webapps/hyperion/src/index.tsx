import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";

// Views
import HomeView from "./components/HomeView";
import CorporationsView from "./components/CorporationsView";
import IndustriesView from "./components/IndustriesView";
import StationsView from "./components/StationsView";
import UniverseView from "./components/UniverseView";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Init Redux
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/corporations" component={CorporationsView} />
          <Route path="/industries" component={IndustriesView} />
          <Route path="/stations" component={StationsView} />
          <Route path="/universe" component={UniverseView} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
