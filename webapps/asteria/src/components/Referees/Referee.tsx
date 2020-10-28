import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./Referee.module.css";

const REFEREE = (id: string) => gql`
  {
    referee(id: "${id}") {
      _id
      firstName
      lastName
    }
  }
`;

const Referee = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(REFEREE(id as string));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>
        {data.referee.firstName} {data.referee.lastName}
      </header>
    </div>
  );
};

export default Referee;
