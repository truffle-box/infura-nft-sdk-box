import React, { useCallback, useContext, useEffect } from 'react';
import { EthProvider } from "../ethereum";

const Gallery = () => {
    const { provider, sdk, user } = useContext(EthProvider);
    const { address } = user;

    const checkConnection = () => {
        switch (true) {
          case sdk && address !== "":
            return <h1>Your NFTs</h1>
          case provider !== null:
            return <h3>Connect your wallet to view your NFT gallery</h3>
          case !provider:
          default:
            return <h3>You will need to install MetaMask to use this application</h3>;
        }
      };

    const listNFTs = useCallback(async () => {
        try {
            const nfts = await sdk.getNFTs({ publicAddress: address });
            console.log(nfts);
        } catch (e) {
            console.log(e);
        }
    });

    useEffect(() => {
        if (sdk) {
            listNFTs();
        }
    });

    return (
        <>
        {checkConnection()}
        </>
    );
};

export default Gallery;
