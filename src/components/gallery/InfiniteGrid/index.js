import React, { useEffect, useState } from "react";

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { MOCK_DATA } from "../mocksdk";
import './index.css'

function getItems(nextGroupKey, count) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  const assets = MOCK_DATA.assets;

  for (let i = 0; i < count; ++i) {
    const daKey = nextKey + i;
    if (assets.length < daKey) {return;}
    nextItems.push({
      groupKey: nextGroupKey, key: daKey,
      asset: assets[daKey]
    });
  }
  console.log("getItems:", { nextGroupKey, count, nextKey, nextItems });
  return nextItems;
}

const Item = ({ num, asset }) => <div className="item">
  <div className="thumbnail">
    <NFTImage url={asset?.metadata?.image} />
  </div>
  <div className="info">
    <span>Name: {asset?.metadata?.name}</span><br />
    <span className={"description_text"}>Desc: {asset?.metadata?.description}</span>
  </div>
</div>;

const NFTImage = ({ url = "" }) => {
  const [realUrl, setRealUrl] = useState(url);
  useEffect(() => {
    if (url.toLowerCase().startsWith("ipfs://")) {
      const hash = url.split("//")[1];
      setRealUrl(`https://ipfs.io/ipfs/${hash}`);
      console.log("RealUrl", { url, realUrl });
    }
  }, [url]);

  return (
    <img
      src={realUrl}
      alt={realUrl} />
  );
};

const GalleryView = () => {
  const [items, setItems] = React.useState(() => getItems(0, 10));

  return <MasonryInfiniteGrid
    className="container"
    gap={5}
    align={"justify"}
    attributePrefix={"p"}
    isConstantSize={true}
    isEqualSize={true}
    onRequestAppend={(e) => {
      const nextGroupKey = (+e.groupKey || 0) + 1;
      console.log("onRequestAppend:", { e, nextGroupKey, items });

      setItems([
        ...items,
        ...getItems(nextGroupKey, 10)
      ]);
    }}
    onRenderComplete={(e) => {
      console.log(e);
    }}
  >
    {items.map((item) => <Item data-grid-groupkey={item.groupKey} key={item.key} num={item.key} asset={item.asset} />)}
  </MasonryInfiniteGrid>;
};

export default GalleryView;
