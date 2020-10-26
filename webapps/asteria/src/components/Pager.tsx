import React, { Dispatch, SetStateAction } from "react";

import styles from "./Pager.module.css";

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pager = ({ page, setPage }: Props) => (
  <div className={styles.wrapper}>
    <i className="material-icons" onClick={() => setPage(0)}>
      first_page
    </i>
    <i
      className="material-icons"
      onClick={() => setPage(page > 0 ? page - 1 : 0)}
    >
      navigate_before
    </i>
    <i className="material-icons" onClick={() => setPage(page + 1)}>
      navigate_next
    </i>
    <i className="material-icons" onClick={() => setPage(1)}>
      last_page
    </i>
  </div>
);

export default Pager;
