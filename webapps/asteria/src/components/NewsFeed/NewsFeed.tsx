import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";

import styles from "./NewsFeed.module.css";

export type FeedEntry = {
  description: string;
  link: string;
  thumbnail: string;
  title: string;
};

type Props = {
  feedUrl: string;
  parseFeed: (feed: Document) => FeedEntry[];
};

const NewsFeed: FunctionComponent<Props> = ({ feedUrl, parseFeed }) => {
  const [feed, setFeed] = useState<Document | null>(null);

  useEffect(() => {
    (async () => {
      const parsedResponse = await fetch(feedUrl)
        .then((response) => response.text())
        .then((text) =>
          new window.DOMParser().parseFromString(text, "text/xml")
        );

      setFeed(parsedResponse);
    })();
  }, [feedUrl]);

  if (!feed)
    return (
      <div className={styles.progressContainer}>
        <CircularProgress />
      </div>
    );

  const entries = parseFeed(feed);

  return (
    <div className={styles.root}>
      <Grid container spacing={2}>
        {entries.map((entry, idx) => (
          <Grid item key={idx} xs>
            <Card className={styles.card}>
              <CardMedia className={styles.cardMedia} image={entry.thumbnail} />
              <CardContent className={styles.cardContent}>
                <Typography gutterBottom variant="h5">
                  {entry.title}
                </Typography>
                <Typography variant="body1">{entry.description}</Typography>
              </CardContent>
              <CardActions>
                <Button color="primary">
                  <a
                    className={styles.link}
                    href={entry.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Read more
                  </a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsFeed;
