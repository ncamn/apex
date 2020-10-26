import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    }
  })
);

type Props = {
  shrinkDrawer: () => void;
};

const AppBar: FunctionComponent<Props> = ({ shrinkDrawer }) => {
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
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
