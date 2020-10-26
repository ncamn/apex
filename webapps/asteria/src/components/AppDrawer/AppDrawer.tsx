import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Divider
} from "@material-ui/core";
import {
  DataUsage as DataUsageIcon,
  Flag as FlagIcon,
  LocationCity as LocationCityIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Sports as SportsIcon,
  SportsSoccer as SportsSoccerIcon,
  TrendingUp as TrendingUpIcon
} from "@material-ui/icons";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { FunctionComponent } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";

type ListItemLinkProps = {
  icon?: React.ReactElement;
  primary: string;
  to: string;
};

const ListItemLink: FunctionComponent<ListItemLinkProps> = ({
  icon,
  primary,
  to
}) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpened: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerShrinked: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      }
    }
  })
);

type Props = {
  shrinked: boolean;
};

const items: ListItemLinkProps[] = [
  { icon: <TrendingUpIcon />, primary: "Leagues", to: "/leagues" },
  { icon: <SportsSoccerIcon />, primary: "Matches", to: "/matches" },
  { icon: <PersonIcon />, primary: "Players", to: "/players" },
  { icon: <SportsIcon />, primary: "Referees", to: "/referees" },
  { icon: <LocationCityIcon />, primary: "Stadiums", to: "/stadiums" },
  { icon: <PeopleIcon />, primary: "Clubs", to: "/clubs" }
];

const AppDrawer: FunctionComponent<Props> = ({ shrinked }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.drawerOpened]: !shrinked,
        [classes.drawerShrinked]: shrinked
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpened]: !shrinked,
          [classes.drawerShrinked]: shrinked
        })
      }}
      variant="permanent"
    >
      <Toolbar />
      <List>
        {items.map(({ icon, primary, to }) => (
          <ListItemLink icon={icon} primary={primary} to={to} />
        ))}
      </List>
      <Divider />
      <List>
        {[
          { icon: <FlagIcon />, primary: "Languages", to: "#" },
          { icon: <DataUsageIcon />, primary: "Monitoring", to: "/monitoring" }
        ].map(({ icon, primary, to }) => (
          <ListItemLink icon={icon} primary={primary} to={to} />
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
