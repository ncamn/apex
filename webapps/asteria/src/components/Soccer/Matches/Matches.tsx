import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Pager from "../../Pager";

import styles from "./Matches.module.css";

const MATCHES = (offset: number, limit: number) => gql`
  {
    matches(offset: ${offset}, limit: ${limit}) {
      _id
      date
    }
  }
`;

const Matches = () => {
  const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(20);
  const { loading, error, data } = useQuery(MATCHES(page * 20, 20));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>
        <div>Date</div>
        <Pager page={page} setPage={setPage} />
      </header>
      {data.matches.map(({ _id, date }: { _id: string; date: Date }) => (
        <Link className={styles.row} key={_id} to={`/soccer/matches/${_id}`}>
          {moment(date).format("dddd, MMMM Do YYYY")}
        </Link>
      ))}
    </div>
  );
};

export default Matches;
