import React, { FunctionComponent, useState } from "react";

interface Props {
  name: string
}

const NavDropDown: FunctionComponent<Props> = ({ children, name }) => {
  const [hover, setHover] = useState(false)

  const style = {
    ul: {
      display: hover ? "initial" : "none"
    }
  };

  return (
    <li
      className="nav-dropdown"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <a>{name}</a>
      <ul style={style.ul}>{children}</ul>
    </li>
  );
}

export default NavDropDown;
