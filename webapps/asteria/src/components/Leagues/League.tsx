import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./League.module.css";

const LEAGUE = (id: string) => gql`
  {
    league(id: "${id}") {
      _id
      name
    }
  }
`;

const League = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(LEAGUE(id as string));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>{data.league.name}</header>
    </div>
  );
};

export default League;
