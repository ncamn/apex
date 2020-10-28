import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Pager from "../Pager";

import styles from "./Leagues.module.css";

const LEAGUES = (offset: number, limit: number) => gql`
  {
    leagues(offset: ${offset}, limit: ${limit}) {
      _id
      name
    }
  }
`;

const Leagues = () => {
  const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(20);
  const { loading, error, data } = useQuery(LEAGUES(page * 20, 20));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>
        <div>Name</div>
        <Pager page={page} setPage={setPage} />
      </header>
      {data.leagues.map(({ _id, name }: { _id: string; name: string }) => (
        <Link className={styles.row} key={name} to={`/soccer/leagues/${_id}`}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Leagues;
