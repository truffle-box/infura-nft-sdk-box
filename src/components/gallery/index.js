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

const Item = ({ asset }) => (
  <Suspense fallback={<PuffLoader loading={true} />}>
    <div className="item">
      <div className="thumbnail">
        <img src={asset?.image} alt="" />
      </div>
      <div className="info">
        <div className="title">{asset?.name}</div>
        <audio controls>
          <source src={asset?.animation_url} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </Suspense>
);

const GalleryView = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { sdk } = useContext(EthProvider);

  const contract = useSelector((state) => state.contract);
  const user = useSelector((state) => state.user.user);

  const start = useCallback(
    async (address) => {
      const data = await sdk.getNFTs({
        publicAddress: address,
        includeMetadata: true,
      });

      const items = data.assets.reduce((listNfts, nft) => {
        if (contract.address) {
          if (nft.contract.toLowerCase() === contract.address.toLowerCase()) {
            listNfts.push(nft.metadata);
            return listNfts;
          }
          return [...listNfts];
        }
        return [...listNfts];
      }, []);

      setItems(items);
      setIsLoading(false);
    },
    [sdk]
  );

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
