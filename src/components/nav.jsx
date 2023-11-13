import React from "react";
import { logo } from "../assets";

const Nav = () => {
  return (
    <nav>
      <div className="icon">
        <div className="logo">
          <img src={logo} alt="logo" />
          <p>Helios</p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
