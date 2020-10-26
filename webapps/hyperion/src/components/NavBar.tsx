import { Link } from "react-router-dom";
import React from "react";

// Styling
import styles from "./NavBar.module.css";

let NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        EVE Dashboard
        </Link>
      <ul className={styles.list}>
        <li>
          <Link to="/corporations">
            Corporations
              </Link>
        </li>
        <li>
          <Link to="/industries">
            Industries
              </Link>
        </li>
        <li >
          <Link to="/stations">
            Stations
              </Link>
        </li>
        <li >
          <Link to="/universe">
            Universe
              </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
