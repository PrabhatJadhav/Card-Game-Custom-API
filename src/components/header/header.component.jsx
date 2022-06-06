import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";
function Header() {
  return (
    <header className="header">
      <div className="heading">
        <h3>Card Game</h3>
      </div>
      <div className="menu">
        <div className="menu-btn">
          <Link to={"/start"}>New Game</Link>
        </div>
        <div className="menu-btn">
          <Link to={"/"}>Reset</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
