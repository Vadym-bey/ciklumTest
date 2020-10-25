import React from "react";
import { Link } from "react-router-dom";
import { Logo } from '../../assets/index';
import "./styles.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-nav">
        <Link className="nav-link" to="/">
          Home page
        </Link>
        <Link className="nav-link" to="/short-articles">
          Short articles page
        </Link>
      </div>
    </div>
  );
};

export default Header;
