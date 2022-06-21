import React from "react";
import { NavLink } from "react-router-dom";

const MenuLink = ({ link, name, icon, children }) => {
  return (
    <NavLink to={link} end>
      <div className="w-full flex flex-row"><img alt={name} src={icon} className="pr-1" /> {name}</div>
    </NavLink>
  );
};

export default MenuLink;
