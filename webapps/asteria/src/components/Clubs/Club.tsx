import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useParams } from "react-router-dom";

import styles from "./Club.module.css";

const CLUB = (id: string) => gql`
  {
    club(id: "${id}") {
      _id
      name
    }
  }
`;

const Club = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CLUB(id as string));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>{data.club.name}</header>
    </div>
  );
};

export default Club;
