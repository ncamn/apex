import React from "react";

import CorporationList from "./CorporationsList";
import CorporationPanel from "./CorporationPanel";

import "./CorporationsView.css";

class CorporationsView extends React.Component {
  render() {
    return (
      <div className="corp-view flex-column">
        <div className="filters-container">{/* <Toogle/> */}</div>
        <div className="flex-row">
          <div className="list">
            <input placeholder="Search" type="text" />
            <CorporationList />
          </div>
          <CorporationPanel />
        </div>
      </div>
    );
  }
}

export default CorporationsView;
