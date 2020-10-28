import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./Stadium.module.css";

const STADIUM = (id: string) => gql`
  {
    stadium(id: "${id}") {
      _id
      name
      city
    }
  }
`;

const Stadium = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(STADIUM(id as string));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>{data.stadium.name}</header>
    </div>
  );
};

export default Stadium;
