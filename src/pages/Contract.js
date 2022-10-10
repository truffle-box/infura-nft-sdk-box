import ERC721Mintable from "./contracts/ERC721Mintable";
import React from "react";
import { TEMPLATES } from "@infura/sdk";
import { useSelector } from "react-redux";

const Contract = () => {
  const contract = useSelector((state) => state.contract);

  return (
    <>{contract.type === TEMPLATES.ERC721Mintable && <ERC721Mintable />}</>
  );
};

export default Contract;
