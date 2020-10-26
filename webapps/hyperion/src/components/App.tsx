import React, { FunctionComponent } from "react";

// Components
import NavBar from "./NavBar";

// CSS
import styles from "./App.module.css";

interface Props {
  children: any
}

const App: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.views}>
      {children}
      </div>
    </div>
  );
};

export default App;
