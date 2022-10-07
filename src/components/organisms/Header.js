import React, { useContext } from "react";

import Account from "../atoms/Account";
import Button from "../atoms/Button";
import { EthProvider } from "../../ethereum";
import infurabrand from "../../assets/infura_brand.svg";
import { useSelector } from "react-redux";

const Header = () => {
  const { provider } = useContext(EthProvider);
  const user = useSelector((state) => state.user.user);
  const checkConnection = () => {
    switch (true) {
      case provider && user.address !== "":
        return <Account />;
      case provider !== null:
        return <Button icon="fox">Connect with Wallet</Button>;
      case !provider:
      default:
        return null;
    }
  };

  return (
    <header>
      <img
        src={infurabrand}
        alt="Infura"
        style={{ width: "3rem", marginLeft: "1rem" }}
      />
      {checkConnection()}
    </header>
  );
};

export default Header;
