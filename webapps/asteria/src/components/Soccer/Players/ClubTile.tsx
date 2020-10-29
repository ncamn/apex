import { Card, CardHeader, CardActions, Button } from "@material-ui/core";
import { People as PeopleIcon } from "@material-ui/icons";
import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  club: { _id: string; name: string };
};

const ClubTile: FunctionComponent<Props> = ({ club }) => (
  <Card>
    <CardHeader
      avatar={<PeopleIcon />}
      title={club.name}
      subheader="2014 - now"
    />
    <CardActions>
      <Button component={RouterLink} to={`/soccer/clubs/${club._id}`}>
        See club
      </Button>
    </CardActions>
  </Card>
);

export default ClubTile;
