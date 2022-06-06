import React from "react";
import MenuLink from "../atoms/MenuLink";
import add from "../../assets/add.svg";
import categories from "../../assets/categories.svg";
import protocols from "../../assets/protocols.svg";
import FilterLink from "../atoms/FilterLink";

const Nav = () => {
  return (
    <nav>
      <MenuLink link="/" name="Options" icon={categories} />
      <div style={{ position: "relative", left: "10px" }}>
        <FilterLink category="protocol" name="Load Contract" icon={protocols} />
        <MenuLink link="/add-contract" name="Add New Contract" icon={add} />
      </div>
    </nav>
  );
};

export default Nav;
