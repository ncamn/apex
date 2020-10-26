import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Pager from "../Pager";

import styles from "./Referees.module.css";

const REFEREES = (offset: number, limit: number) => gql`
  {
    referees(offset: ${offset}, limit: ${limit}) {
      _id
      firstName
      lastName
    }
  }
`;

const Referees = () => {
  const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(20);
  const { loading, error, data } = useQuery(REFEREES(page * 20, 20));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header className={styles.header}>
        <div>Name</div>
        <Pager page={page} setPage={setPage} />
      </header>
      {data.referees.map(
        ({
          _id,
          firstName,
          lastName
        }: {
          _id: string;
          firstName: string;
          lastName: string;
        }) => (
          <Link className={styles.row} key={_id} to={`/referees/${_id}`}>
            {firstName} {lastName}
          </Link>
        )
      )}
    </div>
  );
};

export default Referees;
