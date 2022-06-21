import React, { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { EthProvider } from "../../../ethereum";
import { PuffLoader } from "react-spinners";

import "./index.css";

const Item = ({ num, asset }) => (
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

  const { sdk, user } = useContext(EthProvider);

  const start = useCallback(async (address) => {
    const data = await sdk.getNFTs({
      publicAddress: address,
      includeMetadata: true
    });

    const items = [];
    for (let i = 0; i < data.assets.length; ++i) {
      console.log(data.assets[i].metadata);
      items.push(data.assets[i].metadata);
    }
    setItems(items);
  }, [sdk]);

  useEffect(() => {
    if (user && user.address) {
      start(user.address);
    } else {
      setItems([]);
    }
  }, [start, user]);

  return (<>
    {items.length > 0 ?
      items.map((item, i) => (
        <Item
          data-grid-groupkey={i}
          key={i}
          num={i}
          asset={item}
        />)
      ) :
      (<div>Loading...</div>)
    }
  </>);
};

export default GalleryView;
