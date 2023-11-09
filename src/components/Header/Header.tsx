import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header_inner">
          <ul className="header_list">
            <li className="header_item">
              <Link className="header_link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
