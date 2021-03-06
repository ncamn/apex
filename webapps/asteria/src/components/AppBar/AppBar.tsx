import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Popover,
} from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  Brightness2 as Brightness2Icon,
  Language as LanguageIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent, useState } from "react";

import styles from "./AppBar.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

const languages = [
  {
    flagCode: "gb",
    name: "English",
  },
  {
    flagCode: "fr",
    name: "Français",
  },
];

type Props = {
  shrinkDrawer: () => void;
  switchTheme: () => void;
};

const AppBar: FunctionComponent<Props> = ({
  children,
  shrinkDrawer,
  switchTheme,
}) => {
  const classes = useStyles();
  const [languageAnchor, setLanguageAnchor] = useState<Element | null>(null);

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
          <Brightness2Icon onClick={() => switchTheme()} />

          <LanguageIcon onClick={(e) => setLanguageAnchor(e.currentTarget)} />
          <Popover
            anchorEl={languageAnchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            onClose={() => setLanguageAnchor(null)}
            open={Boolean(languageAnchor)}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Paper className={styles.popover}>
              {languages.map(({ flagCode, name }) => (
                <div key={flagCode}>
                  <img
                    alt="Country flag"
                    src={`https://www.countryflags.io/${flagCode}/flat/32.png`}
                  />
                  <Typography>{name}</Typography>
                </div>
              ))}
            </Paper>
          </Popover>

          <AccountCircleIcon />
        </div>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
