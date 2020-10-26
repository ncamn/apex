import React from "react";

import logo from "./logo.svg";
import styles from "./Home.module.css";

const Home = () => (
  <header className={styles.header}>
    <img src={logo} className={styles.logo} alt="logo" />
    <p>Welcome</p>
  </header>
);

export default Home;
