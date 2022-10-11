import "./index.css";

import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { EthProvider } from "../../ethereum";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import GalleryContractDetails from "./galleryContractDetails";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Item = ({ asset }) => {
  const urlRegex = /(ipfs:\/\/){1}([^\s]+)/;
  const isIpfsUrl = asset.image.match(urlRegex);
  let imageUrl = asset.image;

  if (isIpfsUrl) {
    imageUrl = !!process.env.REACT_APP_IPFS_GATEWAY ? `${process.env.REACT_APP_IPFS_GATEWAY}/ipfs/${isIpfsUrl[2]}`: isIpfsUrl;
  }

  const uuid = uuidv4()
  return (
    <Suspense fallback={<PuffLoader loading={true} />}>
    <div className="item">
      <Link to={{ pathname: `/nft/${uuid}` }} data ={asset} state={{ asset }}>  
          <div className="thumbnail">
                <img src={imageUrl} alt="" />
            </div>
        </Link> 
      <div className="info">
        <div className="title">{asset?.name}</div>

        {
          asset.animation_url ? (<audio controls>
            <source src={asset?.animation_url} type="audio/mpeg" />
          </audio>) : ''
        }
        
      </div>
    </div>
  </Suspense>
  )

};

const GalleryView = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { sdk } = useContext(EthProvider);

  const contract = useSelector((state) => state.contract);
  const user = useSelector((state) => state.user.user);

  const start = useCallback(async (address) => {
    let data;
    if (contract && contract.address) {
      data = await sdk.getNFTsForCollection({ contractAddress: contract.address });
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
    if (user && user.address && sdk !== null) {
      start(user.address);
    } else {
      setItems([]);
    }
  }, [start, user]);

  if (isLoading) return <div>Loading...</div>;
  if (items.length === 0) return <div>No NFTs</div>;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <GalleryContractDetails contract={contract} />
      </div>
      <div style={{ flex: 3 }}>
        {items.map((item, i) => (
          <Item data-grid-groupkey={i} key={i} num={i} asset={item} />
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
