import React, { useContext } from "react";
import { EthProvider } from "../../ethereum";
import { tap, hover } from "../../theme/FramerVariants.js";
import styled from "styled-components";

const Wrap = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  width: 300px;
  height: 50px;
  img {
    height: 10px;
  }
`;

const ERC721Mintable = () => {
  const { contract } = useContext(EthProvider);

  const addMinter = async () => {
    try {
      contract.addMinter({
        publicAddress: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeMinter = async () => {
    try {
      contract.removeMinter({
        publicAddress: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const mint = async () => {
    try {
      contract.mint({
        publicAddress: "",
        tokenURI: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const royaltyInfo = async () => {
    const info = await contract.royaltyInfo({ tokenId: 1, sellPrice: 10000 });
    alert(info);
  };

  const setContractURI = async () => {
    try {
      contract.setContractURI({
        contractURI: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Wrap onClick={() => royaltyInfo()} whileHover={hover} whileTap={tap}>
        Royalty Info
      </Wrap>
    </>
  );
};

export default ERC721Mintable;
