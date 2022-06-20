import React, { useContext, useState } from "react";
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
  const { user } =  useContext(EthProvider);
  const [tokenUri, setTokenUri] = useState("");
  const [contractAddress] = useState(contract.contractAddress);
  const [mintHash, setMintHash] = useState("");


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

  const inputsHandler = async (e) => {
    console.log(e.target.value);
    setTokenUri(e.target.value)
  }

  const mintToken = async (e) => {
    const { hash } = await contract.mint({
      publicAddress: user.address,
      tokenURI: tokenUri,
    });

    setMintHash(hash);

   }


  return (
    <>
      <h3>contract address is : {contractAddress}</h3> 
          

      <Wrap onClick={() => royaltyInfo()} whileHover={hover} whileTap={tap}>
        Royalty Info
      </Wrap>
      <div>
        <label>
          tokenURI:
        <input type="text" name="tokenURI" onChange={inputsHandler} />
        </label>
        <button onClick={mintToken}>Mint</button>

        {
          !!mintHash? <p>Mint Hash: {mintHash}</p> : null
        }
      </div>
    </>
  );
};

export default ERC721Mintable;
