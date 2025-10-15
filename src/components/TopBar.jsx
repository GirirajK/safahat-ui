import React from "react";
import logo from "../assets/logo_icon.png"

const TopBar = () => {
  return (
    <div className="topbar">
      <img className="topbar__logo" alt="logo" src={logo}  />
      <div className="topbar__title">Safhat صفحات - Data Analytics Tool</div>
    </div>
  );
};

export default TopBar;
