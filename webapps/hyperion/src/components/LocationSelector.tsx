import React, { FunctionComponent } from "react";

// Styling
import "./SideSelector.css";

interface Props {
  handleSelection: Function
  list: any[]
}

const SideSelector: FunctionComponent<Props> = ({ list, handleSelection }) => (
  <div className={"side-selector"}>
    {list.map(item => {
      return (
        <div
          className={"selector-list-item"}
          key={item.id}
          onClick={() => handleSelection(item.id)}
        >
          {item.name}
        </div>
      );
    })}
  </div>
);

export default SideSelector;
