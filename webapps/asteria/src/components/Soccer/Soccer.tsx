import React, { FunctionComponent } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Leagues from "../Leagues/Leagues";
import League from "../Leagues/League";
import Match from "../Matches/Match";
import Matches from "../Matches/Matches";
import Players from "../Players/Players";
import Player from "../Players/Player";
import Referee from "../Referees/Referee";
import Referees from "../Referees/Referees";
import Stadium from "../Stadiums/Stadium";
import Stadiums from "../Stadiums/Stadiums";
import Clubs from "../Clubs/Clubs";
import Club from "../Clubs/Club";
import NewsFeed from "../NewsFeed/NewsFeed";

const Soccer: FunctionComponent = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      {/**
       Leagues
       */}
      <Route path={`${match.path}/leagues/:id`}>
        <League />
      </Route>
      <Route path={`${match.path}/leagues`}>
        <Leagues />
      </Route>

      {/**
       Matches
       */}
      <Route path={`${match.path}/matches/:id`}>
        <Match />
      </Route>
      <Route path={`${match.path}/matches`}>
        <Matches />
      </Route>

      {/**
       Monitoring
       */}
      <Route path={`${match.path}/monitoring`}>Monitoring</Route>

      {/**
       Players
       */}
      <Route path={`${match.path}/players/:id`}>
        <Player />
      </Route>
      <Route path={`${match.path}/players`}>
        <Players />
      </Route>

      {/**
       Referees
       */}
      <Route path={`${match.path}/referees/:id`}>
        <Referee />
      </Route>
      <Route path={`${match.path}/referees`}>
        <Referees />
      </Route>

      {/**
       Stadiums
       */}
      <Route path={`${match.path}/stadiums/:id`}>
        <Stadium />
      </Route>
      <Route path={`${match.path}/stadiums`}>
        <Stadiums />
      </Route>

      {/**
       Clubs
       */}
      <Route path={`${match.path}/clubs/:id`}>
        <Club />
      </Route>
      <Route path={`${match.path}/clubs`}>
        <Clubs />
      </Route>

      {/**
       Home (news feed)
       */}
      <Route exact path={match.path}>
        <NewsFeed />
      </Route>
    </Switch>
  );
};

export default Soccer;
