import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Pager from "../../Pager";

import styles from "./Players.module.css";

const PLAYERS = (offset: number, limit: number) => gql`
  {
    players(offset: ${offset}, limit: ${limit}) {
      _id
      firstName
      lastName
    }
  }
`;

const Players = () => {
  const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(20);
  const { loading, error, data } = useQuery(PLAYERS(page * 20, 20));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>
        <div>Name</div>
        <Pager page={page} setPage={setPage} />
      </header>
      {data.players.map(
        ({
          _id,
          firstName,
          lastName,
        }: {
          _id: string;
          firstName: string;
          lastName: string;
        }) => (
          <Link className={styles.row} key={_id} to={`/soccer/players/${_id}`}>
            {firstName} {lastName}
          </Link>
        )
      )}
      <footer className={styles.footer}>
        <div>Page {page + 1}</div>
      </footer>
    </div>
  );
};

export default Players;
