import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Divider,
} from "@material-ui/core";
import { DataUsage as DataUsageIcon } from "@material-ui/icons";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { FunctionComponent } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const drawerWidth = 180;
const shrunkDrawerWidth = 56;

export type ListItemLinkProps = {
  icon?: React.ReactElement;
  primary: string;
  to: string;
};

export const ListItemLink: FunctionComponent<ListItemLinkProps> = ({
  icon,
  primary,
  to,
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
        {icon ? (
          <ListItemIcon style={{ minWidth: 42 }}>{icon}</ListItemIcon>
        ) : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpened: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerShrunk: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      // width: theme.spacing(7) + 1,
      width: shrunkDrawerWidth,
      [theme.breakpoints.up("sm")]: {
        // width: theme.spacing(9) + 1
        width: shrunkDrawerWidth,
      },
    },
  })
);

type Props = {
  shrunk: boolean;
};

const AppDrawer: FunctionComponent<Props> = ({ children, shrunk }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.drawerOpened]: !shrunk,
        [classes.drawerShrunk]: shrunk,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpened]: !shrunk,
          [classes.drawerShrunk]: shrunk,
        }),
      }}
      variant="permanent"
    >
      <Toolbar />

      <List>{children}</List>

      <Divider />

      <List>
        <ListItemLink
          icon={<DataUsageIcon />}
          primary={"Monitoring"}
          to={"/monitoring"}
        />
      </List>
    </Drawer>
  );
};

export default AppDrawer;
