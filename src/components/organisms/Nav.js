import React from "react";
import MenuLink from "../atoms/MenuLink";
import add from "../../assets/add.svg";
import categories from "../../assets/categories.svg";
import nft from "../../assets/nft.svg";
import protocols from "../../assets/protocols.svg";

const Nav = () => {
  return (
    <nav>
      <MenuLink link="/" name="Home" icon={categories} />
      <div style={{ position: "relative", left: "10px" }}>
        <MenuLink link="/gallery" name="Gallery" icon={nft} />
        <MenuLink link="/load-contract" name="Load Contract" icon={protocols} />
        <MenuLink link="/add-contract" name="Add New Contract" icon={add} />
      </div>
    </nav>
  );
};

export default Nav;
