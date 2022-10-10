import React, { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { EthProvider } from "../../ethereum";
import { PuffLoader } from "react-spinners";

import "./index.css";
const Item = ({ asset }) => {  
  const urlRegex = /(ipfs:\/\/){1}([^\s]+)/;
  const isIpfsUrl = asset.image.match(urlRegex);
  let imageUrl = asset.image;

  if (isIpfsUrl) {
    imageUrl = `${process.env.REACT_APP_IPFS_GATEWAY}/ipfs/${isIpfsUrl[2]}`
  }

  return (<Suspense fallback={<PuffLoader loading={true} />}>
    <div className="item">
      <div className="thumbnail">
        <img src={imageUrl} alt="" />
      </div>
      <div className="info">
        <div className="title">{asset?.name}</div>
        {
          asset.animation_url? (<audio controls>
            <source src={asset?.animation_url} type="audio/mpeg" />
          </audio>): null
        }
      </div>
    </div>
  </Suspense>)
};

const GalleryView = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { sdk, user, contract } = useContext(EthProvider);

  const start = useCallback(async (address) => {

    let data;

    if (contract && contract.contractAddress) {
      console.log(contract);
      data = await sdk.getNFTsForCollection({ contractAddress: contract.contractAddress });

      const items = data.assets.map((nft) =>{
        return nft.metadata;
      });
      setItems(items);
      setIsLoading(false);
      return;
    }
    data = await sdk.getNFTs({
      publicAddress: address,
      includeMetadata: true
    });

    const items = data.assets.map((nft) =>{
      return nft.metadata;
    });

    setItems(items);
    setIsLoading(false);
    return;
  }, [sdk, contract]);

  useEffect(() => {
    if (user && user.address) {
      start(user.address);
    } else {
      setItems([]);
    }
  }, [start, user]);

  return (<>
    {isLoading ? <div>Loading...</div> : items.length > 0 ?
      items.map((item, i) => (
        <Item
          data-grid-groupkey={i}
          key={i}
          num={i}
          asset={item}
        />)
      ) :
      (<div>No NFTs</div>)
    }
  </>);
};

export default GalleryView;
