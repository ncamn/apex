import React from "react";

import styles from "./HomeView.module.css";

let HomeView = () => {
  return (
    <div className={styles.homeView}>
      <video className={styles.video} autoPlay loop muted>
        <source src="videoplayback1080p.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <h1>EVE Dashboard</h1>
        <h3>Welcome to the EVE Dashboard</h3>
      </div>
    </div>
  );
};

export default HomeView;
