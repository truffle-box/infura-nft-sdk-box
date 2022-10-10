import React, { useContext } from "react";

import infurabrand from "../../assets/infura_brand.svg";
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
      <img src={infurabrand} alt="Infura" style={{"width": "3rem", "marginLeft": "1rem"}} />
      {checkConnection()}
    </header>
  );
};

export default Header;
