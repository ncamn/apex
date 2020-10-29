import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Pager from "../../Pager";

import styles from "./Clubs.module.css";

const CLUBS = (offset: number, limit: number) => gql`
  {
    clubs(offset: ${offset}, limit: ${limit}) {
      _id
      name
    }
  }
`;

const Clubs = () => {
  const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(20);
  const { loading, error, data } = useQuery(CLUBS(page * 20, 20));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>
        <div>Name</div>
        <Pager page={page} setPage={setPage} />
      </header>
      {data.clubs.map(({ _id, name }: { _id: string; name: string }) => (
        <Link className={styles.row} key={name} to={`/soccer/clubs/${_id}`}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Clubs;
