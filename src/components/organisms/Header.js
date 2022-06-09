import React, { useContext } from "react";

import mmbrand from "../../assets/mm_brand.svg";
import Button from "../atoms/Button";
import { EthProvider } from "../../ethereum";
import Account from "../atoms/Account";

const Header = () => {
  const { provider, user } = useContext(EthProvider);
  const { address } = user;

  const checkConnection = () => {
    switch (true) {
      case provider && address !== "":
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
      <img src={mmbrand} alt="MetaMask" />
      {checkConnection()}
    </header>
  );
};

export default Header;
