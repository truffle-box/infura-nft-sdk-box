import React, { useContext } from 'react';
import { EthProvider } from '../../ethereum';
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
    const { contract} = useContext(EthProvider);
    console.log(contract);

    const royaltyInfo = async () => {
        const info = await contract.royaltyInfo({tokenId: 1, sellPrice: 10000});
        alert(info);
    }

    return (
        <>
            <Wrap onClick={() => royaltyInfo()} whileHover={hover} whileTap={tap}>
                Royalty Info
            </Wrap>
        </>
    );
};

export default ERC721Mintable;
