import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import CurrencyView from "./components/CurrencyView";
import ExchangeView from "./components/ExchangeView";
import HomeView from "./components/HomeView";
import PairView from "./components/PairView";
import CorrelationView from "./components/CorrelationView";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NotificationContainer from "./components/NotificationContainer";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Route exact path="/" component={HomeView} />
        <Switch>
          <Route exact path="/correlation" component={CorrelationView} />

          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/logout" />
          <Route exact path="/register" component={RegisterForm} />

          <Route exact path="/:exchange/:base/:quote" component={PairView} />
          <Route exact path="/:exchange/:currency" component={CurrencyView} />
          <Route exact path="/:exchange" component={ExchangeView} />
        </Switch>
        <NotificationContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
