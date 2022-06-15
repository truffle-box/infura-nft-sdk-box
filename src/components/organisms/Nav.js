import React, { useContext } from "react";
import MenuLink from "../atoms/MenuLink";
import add from "../../assets/add.svg";
import categories from "../../assets/categories.svg";
import nft from "../../assets/nft.svg";
import protocols from "../../assets/protocols.svg";
import icon_stars from "../../assets/icon_stars.svg";
import { EthProvider } from "../../ethereum";

const Nav = () => {
  const { contract } = useContext(EthProvider);

  return (
    <nav>
      <MenuLink link="/" name="Home" icon={categories} />
      <div style={{ position: "relative", left: "10px" }}>
        {contract && (
          <MenuLink link="/contract" name="Contract" icon={icon_stars} />
        )}
        <MenuLink link="/gallery" name="Gallery" icon={nft} />
        <MenuLink link="/load-contract" name="Load Contract" icon={protocols} />
        <MenuLink link="/add-contract" name="Add New Contract" icon={add} />
      </div>
    </nav>
  );
};

export default Nav;
