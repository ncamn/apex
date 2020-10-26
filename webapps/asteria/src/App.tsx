import { ApolloProvider } from "@apollo/react-hooks";
import { CssBaseline, Toolbar } from "@material-ui/core";
import ApolloClient from "apollo-boost";
import React, { FunctionComponent, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import AppBar from "./components/AppBar/AppBar";
import AppDrawer from "./components/AppDrawer/AppDrawer";
import Home from "./components/Home/Home";
import League from "./components/Leagues/League";
import Leagues from "./components/Leagues/Leagues";
import Match from "./components/Matches/Match";
import Matches from "./components/Matches/Matches";
import Player from "./components/Players/Player";
import Players from "./components/Players/Players";
import Referee from "./components/Referees/Referee";
import Referees from "./components/Referees/Referees";
import Stadium from "./components/Stadiums/Stadium";
import Stadiums from "./components/Stadiums/Stadiums";
import Club from "./components/Clubs/Club";
import Clubs from "./components/Clubs/Clubs";

import styles from "./App.module.css";

const client = new ApolloClient({
  uri: "https://localhost:3001/graphql"
});

const App: FunctionComponent = () => {
  const [shrinkedDrawer, shrinkDrawer] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className={styles.app}>
          <CssBaseline />

          <AppBar shrinkDrawer={() => shrinkDrawer(!shrinkedDrawer)} />

          <AppDrawer shrinked={shrinkedDrawer} />

          <main className={styles.content}>
            <Toolbar />

            {/* prettier-ignore */}
            <Switch>
              /** 
              Leagues
              */
              <Route path="/leagues/soccer">
                <Leagues />
              </Route>
              <Route path="/leagues/:id">
                <League />
              </Route>
              <Route path="/leagues">
                <Redirect to="/leagues/soccer" />
              </Route>

              /**
              Matches
              */
              <Route path="/matches/:id">
                <Match />
              </Route>
              <Route path="/matches">
                <Matches />
              </Route>

              /**
              Monitoring
              */
              <Route path="/monitoring">
                Monitoring
            </Route>

              /** 
              Players
              */
              <Route path="/players/basketball">
                Baksetball players
            </Route>
              <Route path="/players/rugby">
                Rugby players
            </Route>
              <Route path="/players/soccer">
                <Players />
              </Route>
              <Route path="/players/tennis">
                Tennis
            </Route>
              <Route path="/players/:id">
                <Player />
              </Route>
              <Route path="/players">
                <Redirect to="/players/soccer" />
              </Route>

              /**
              Referees
              */
              <Route path="/referees/:id">
                <Referee />
              </Route>
              <Route path="/referees">
                <Referees />
              </Route>

              /**
              Stadiums
              */
              <Route path="/stadiums/:id">
                <Stadium />
              </Route>
              <Route path="/stadiums">
                <Stadiums />
              </Route>

              /**
              Clubs
              */
              <Route path="/clubs/soccer">
                <Clubs />
              </Route>
              <Route path="/clubs/:id">
                <Club />
              </Route>
              <Route path="/clubs">
                <Redirect to="/clubs/soccer" />
              </Route>

              /**
              General
              */
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
