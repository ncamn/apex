import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./Match.module.css";

const MATCH = (id: string) => gql`
  {
    match(id: "${id}") {
      _id
      date
    }
  }
`;

const Match = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(MATCH(id as string));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>
        {moment(data.match.date).format("dddd, MMMM Do YYYY")}
      </header>
    </div>
  );
};

export default Match;
