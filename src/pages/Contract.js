import { TEMPLATES } from "@infura/sdk";
import React, { useContext } from "react";
import { EthProvider } from "../ethereum";
import ERC721Mintable from "./contracts/ERC721Mintable";

const Contract = () => {
  const { contract } = useContext(EthProvider);

  return (
    <>{contract.getTemplate() === TEMPLATES.ERC721Mintable && <ERC721Mintable />}</>
  );
};

export default Contract;
