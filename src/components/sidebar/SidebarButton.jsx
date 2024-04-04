import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarButton.css";
import { IconContext } from "react-icons";

const SidebarButton = ({ title, to, icon, logout }) => {
  console.log(logout);
  const location = useLocation();
  const isActive = location.pathname === to;

  const btnClass = isActive ? "btn-body active" : "btn-body";

  return logout ? (
    <div className={btnClass} onClick={logout}>
      <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
        {icon}
        <p className="btn-title">{title}</p>
      </IconContext.Provider>
    </div>
  ) : (
    <Link to={to}>
      <div className={btnClass}>
        <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
          {icon}
          <p className="btn-title">{title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
};

export default SidebarButton;
