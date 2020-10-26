import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader
} from "@material-ui/core";
import { SportsSoccer as SportsSoccerIcon } from "@material-ui/icons";
import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  match: any;
}

const MatchTile: FunctionComponent<Props> = ({ match }) => {
  return (
    <Card style={{ minWidth: 240 }}>
      <CardHeader avatar={<SportsSoccerIcon />} title="League" />

      <CardContent>
        <Typography noWrap>
          <span>{match.club1.club.name}</span>
          <span>{match.club1.goals.length}</span>
        </Typography>
        <Typography noWrap>
          <span>{match.club2.club.name}</span>
          <span>{match.club2.goals.length}</span>
        </Typography>
      </CardContent>

      <CardActions>
        <Button component={RouterLink} to={`/matches/${match._id}`}>
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchTile;
