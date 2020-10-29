import {
  CardHeader,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Person as PersonIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import ClubTile from "./ClubTile";
import MatchTile from "./MatchTile";

import defaultAvatar from "./avatar.svg";

const PLAYER = (id: string) => gql`
  {
    player(id: "${id}") {
      _id
      avatar
      firstName
      lastName
      clubs {
        _id
        name
      }
      matches {
        _id
        club1 {
          club {
            name
          }
          goals {
            player {
              _id
            }
          }
        }
        club2 {
          club {
            name
          }
          goals {
            player {
              _id
            }
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  progressContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "100%",
  },
  errorContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "100%",
  },
  root: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    "& h4": {
      marginTop: "1.6rem",
      marginBottom: "1rem",
      marginRight: "1rem",
    },
  },
  pic: {
    height: "20vmin",
    pointerEvents: "none",
    padding: "1rem",
  },
});

const Player: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const { loading, error, data } = useQuery(PLAYER(id as string));

  if (loading)
    return (
      <Box className={classes.progressContainer}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box className={classes.errorContainer}>
        <p>{error}</p>
      </Box>
    );

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Card style={{ minWidth: 240 }}>
            <CardHeader
              avatar={<PersonIcon />}
              title={`${data.player.firstName} ${data.player.lastName}`}
              subheader="28 years old - Atlanta"
            />

            <CardContent>
              <img src={defaultAvatar} className={classes.pic} alt="pic" />
            </CardContent>
          </Card>
        </Grid>

        {data.player.clubs
          .slice(0, 5)
          .map((club: { _id: string; name: string }) => (
            <Grid item key={club._id} xs>
              <ClubTile club={club} />
            </Grid>
          ))}
      </Grid>

      <Typography variant="h4">Matches played</Typography>
      <Grid container spacing={2}>
        {data.player.matches.map((match: { _id: string }) => (
          <Grid item key={match._id} xs>
            <MatchTile match={match} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Player;