import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";

import styles from "./NewsFeed.module.css";

type Entry = {
  description: string;
  thumbnail: string;
  title: string;
};

const feedUrl =
  "https://cors-anywhere.herokuapp.com/https://www.goal.com/feeds/en/news";

const NewsFeed: FunctionComponent = () => {
  const [feed, setFeed] = useState<Document | null>(null);

  useEffect(() => {
    (async () => {
      const parsedResponse = await fetch(feedUrl)
        .then((response) => response.text())
        .then((text) =>
          new window.DOMParser().parseFromString(text, "text/xml")
        );

      setFeed(parsedResponse as any);
    })();
  }, []);

  if (!feed)
    return (
      <div className={styles.progressContainer}>
        <CircularProgress />
      </div>
    );

  let entries: Entry[] = [];
  feed.querySelectorAll("item").forEach((el) => {
    entries = [
      ...entries,
      {
        description: el.querySelector("description")!.innerHTML,
        thumbnail: el
          .getElementsByTagName("media:thumbnail")[0]
          .attributes.getNamedItem("url")!.value,
        title: el.querySelector("title")!.innerHTML,
      },
    ];
  });

  return (
    <div className={styles.root}>
      <Grid container spacing={2}>
        {entries.map((entry, idx) => (
          <Grid item key={idx} xs>
            <Card className={styles.card}>
              <CardMedia className={styles.cardMedia} image={entry.thumbnail} />
              <CardContent>
                <Typography variant="h6">{entry.title.slice(9, -3)}</Typography>
                <Typography>{entry.description.slice(9, -3)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsFeed;
