import { CssBaseline, Toolbar, Typography } from "@material-ui/core";
import {
  LocationCity as LocationCityIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  RssFeed as RssFeedIcon,
  Sports as SportsIcon,
  SportsBaseball as SportsBaseballIcon,
  SportsBasketball as SportsBasketballIcon,
  SportsEsports as SportsEsportsIcon,
  SportsFootball as SportsFootballIcon,
  SportsMma as SportsMmaIcon,
  SportsMotorsports as SportsMotorsportsIcon,
  SportsRugby as SportsRugbyIcon,
  SportsSoccer as SportsSoccerIcon,
  SportsTennis as SportsTennisIcon,
  TrendingUp as TrendingUpIcon,
} from "@material-ui/icons";
import React, { FunctionComponent, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

import AppBar from "./components/AppBar/AppBar";
import AppDrawer, { ListItemLink } from "./components/AppDrawer/AppDrawer";
import Home from "./components/Home/Home";
import Soccer from "./components/Soccer/Soccer";
import Rugby from "./components/Rugby/Rugby";
import Basketball from "./components/Basketball/Basketball";
import Tennis from "./components/Tennis/Tennis";
import Baseball from "./components/Baseball/Baseball";
import Football from "./components/Football/Football";
import Esports from "./components/Esports/Esports";
import Motorsports from "./components/Motorsports/Motorsports";
import Mma from "./components/Mma/Mma";
import NotFound from "./NotFound";

import styles from "./App.module.css";

const routes = [
  {
    drawerLinks: [
      { icon: <RssFeedIcon />, primary: "News", to: "/" },
      { icon: <TrendingUpIcon />, primary: "Leagues", to: "/leagues" },
      { icon: <SportsSoccerIcon />, primary: "Matches", to: "/matches" },
      { icon: <PersonIcon />, primary: "Players", to: "/players" },
      { icon: <SportsIcon />, primary: "Referees", to: "/referees" },
      { icon: <LocationCityIcon />, primary: "Stadiums", to: "/stadiums" },
      { icon: <PeopleIcon />, primary: "Clubs", to: "/clubs" },
    ],
    icon: <SportsSoccerIcon />,
    mainContent: <Soccer />,
    name: "Soccer",
    path: "/soccer",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsRugbyIcon />,
    mainContent: <Rugby />,
    name: "Rugby",
    path: "/rugby",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsTennisIcon />,
    mainContent: <Tennis />,
    name: "Tennis",
    path: "/tennis",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsBasketballIcon />,
    mainContent: <Basketball />,
    name: "Basketball",
    path: "/basketball",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsBaseballIcon />,
    mainContent: <Baseball />,
    name: "Baseball",
    path: "/baseball",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsFootballIcon />,
    mainContent: <Football />,
    name: "Football",
    path: "/football",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsMmaIcon />,
    mainContent: <Mma />,
    name: "MMA",
    path: "/mma",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsMotorsportsIcon />,
    mainContent: <Motorsports />,
    name: "Motorsports",
    path: "/motorsports",
  },
  {
    drawerLinks: [{ icon: <PersonIcon />, primary: "Players", to: "/players" }],
    icon: <SportsEsportsIcon />,
    mainContent: <Esports />,
    name: "E-Sports",
    path: "/e-sports",
  },
];

const App: FunctionComponent = () => {
  const [shrunkDrawer, shrinkDrawer] = useState(false);

  return (
    <div className={styles.app}>
      <CssBaseline />

      <AppBar shrinkDrawer={() => shrinkDrawer(!shrunkDrawer)}>
        {routes.map(({ icon, path, name }, idx) => (
          <Link key={idx} to={path}>
            {icon}
            <Typography>{name}</Typography>
          </Link>
        ))}
      </AppBar>

      <AppDrawer shrunk={shrunkDrawer}>
        {routes.map(({ drawerLinks, path }, idx) => (
          <Route key={idx} path={path}>
            {drawerLinks.map(({ icon, primary, to }, idx2) => {
              return (
                <ListItemLink
                  icon={icon}
                  key={idx2}
                  primary={primary}
                  to={`${path}${to}`}
                />
              );
            })}
          </Route>
        ))}
      </AppDrawer>

      <main className={styles.content}>
        <Toolbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          {routes.map(({ mainContent, path }, idx) => (
            <Route key={idx} path={path}>
              {mainContent}
            </Route>
          ))}

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
