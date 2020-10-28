import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  Brightness2 as Brightness2Icon,
  Language as LanguageIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";

import styles from "./AppBar.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

type Props = {
  shrinkDrawer: () => void;
};

const AppBar: FunctionComponent<Props> = ({ children, shrinkDrawer }) => {
  const classes = useStyles();

  return (
    <MuiAppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={shrinkDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Asteria</Typography>

        <div className={styles.sports}>{children}</div>

        <div className={styles.parameters}>
          <Brightness2Icon />
          <LanguageIcon />
          <AccountCircleIcon />
        </div>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
