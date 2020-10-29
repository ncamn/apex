import React, { FunctionComponent } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import NewsFeed, { FeedEntry } from "../NewsFeed/NewsFeed";
import Leagues from "./Leagues/Leagues";
import League from "./Leagues/League";
import Match from "./Matches/Match";
import Matches from "./Matches/Matches";
import Players from "./Players/Players";
import Player from "./Players/Player";
import Referee from "../Referees/Referee";
import Referees from "../Referees/Referees";
import Stadium from "./Stadiums/Stadium";
import Stadiums from "./Stadiums/Stadiums";
import Clubs from "./Clubs/Clubs";
import Club from "./Clubs/Club";

const routes = [
  ["/leagues/:id", <League />],
  ["/leagues", <Leagues />],
  ["/matches/:id", <Match />],
  ["/matches", <Matches />],
  ["/players/:id", <Player />],
  ["/players", <Players />],
  ["/referees/:id", <Referee />],
  ["/referees", <Referees />],
  ["/stadiums/:id", <Stadium />],
  ["/stadiums", <Stadiums />],
  ["/clubs/:id", <Club />],
  ["/clubs", <Clubs />],
];

const feedUrl =
  "https://cors-anywhere.herokuapp.com/https://www.goal.com/feeds/en/news";

const parseFeed = (feed: Document) => {
  let entries: FeedEntry[] = [];

  feed.querySelectorAll("item").forEach((el) => {
    entries = [
      ...entries,
      {
        description: el.querySelector("description")!.innerHTML.slice(9, -3),
        link: el.querySelector("link")!.innerHTML.slice(9, -3),
        thumbnail: el
          .getElementsByTagName("media:thumbnail")[0]
          .attributes.getNamedItem("url")!.value,
        title: el.querySelector("title")!.innerHTML.slice(9, -3),
      },
    ];
  });

  return entries;
};

const Soccer: FunctionComponent = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.path}>
        <NewsFeed feedUrl={feedUrl} parseFeed={parseFeed} />
      </Route>

      {routes.map(([path, component], idx) => (
        <Route key={idx} path={`${match.path}${path}`}>
          {component}
        </Route>
      ))}

      <Route path={`${match.path}/monitoring`}>Monitoring</Route>
    </Switch>
  );
};

export default Soccer;
