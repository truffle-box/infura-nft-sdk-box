import React from "react";

import MenuLink from "../atoms/MenuLink";

import add from "../../assets/add.svg";
import categories from "../../assets/categories.svg";
import nft from "../../assets/nft.svg";
import iconStars from "../../assets/icon_stars.svg";
import box from "../../assets/box.svg";
import protocols from "../../assets/protocols.svg";
import FilterLink from "../atoms/FilterLink";

const Nav = () => {
  return (
    <nav>
      <MenuLink link="/" name="Categories" icon={categories} />
      <div style={{ position: "relative", left: "10px" }}>
        <FilterLink category="nfts" name="NFTs" icon={nft} />
        <MenuLink link="/b" name="Best Rated" icon={iconStars} />
        <FilterLink category="utility" name="Utilities" icon={box} />
        <FilterLink category="protocol" name="Protocols" icon={protocols} />
        <MenuLink link="/add-snap" name="Add New Snap" icon={add} />
      </div>
    </nav>
  );
};

export default Nav;
