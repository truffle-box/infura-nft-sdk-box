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

const StyledInput = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 1rem;
  width: 50rem;
  border: solid 0.1rem darkgray;
  font-size: 1rem;
  padding: 0.2rem 0.4rem;
`;

const StyleButton = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 1rem;
  display: block;
  margin: 1rem 0;
  background: #935DD7;
  color: #fff;
  font-weight: bold;
`;

const ERC721Mintable = () => {
  const [metadataUri, setMetadataUri] = useState('');

  const { contract, user } = useContext(EthProvider);

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
        publicAddress: user.address,
        tokenURI: metadataUri
      });
      setMetadataUri('');
    } catch (e) {
      console.log(e);
    }
  };

  const royaltyInfo = async () => {
    console.log(contract)
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
      <h3>Mint a new NFT <small>({contract.contractAddress}</small>)</h3>
      <p>To mint a new NFT, simply paste in the metadata URI below and press mint.</p>
      <StyledInput placeholder="ipfs://" value={metadataUri} onChange={e => setMetadataUri(e.target.value)} />
      <StyleButton onClick={() => mint()}>Mint</StyleButton>
    </>
  );
};

export default ERC721Mintable;
