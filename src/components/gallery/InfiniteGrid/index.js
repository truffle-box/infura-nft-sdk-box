import React, { Suspense, useCallback, useEffect, useState } from "react";

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { MOCK_DATA } from "../mocksdk";
import axios from "axios";
import { PuffLoader } from "react-spinners";

import "./index.css";

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

const Item = ({ num, asset }) =>
  <Suspense fallback={<PuffLoader loading={true} />}>
    <div className="item">
      <div className="thumbnail">
        <NFTImage url={asset?.metadata?.image} />
      </div>
      <div className="info">
        <div className="title">Name: {asset?.metadata?.name}</div>
        <br />
        <div className="description">Desc: {asset?.metadata?.description}</div>
      </div>
    </div>
  </Suspense>;

const RenderNFTImage = ({ url, mimeType }) => {

  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isSvg, setIsSvg] = useState(false);

  useEffect(() => {
    // set the hoobmajoob
    if (mimeType.startsWith("image")) {
      setIsImage(true);
      setIsVideo(false);
      setIsSvg(false);
    }
    if (mimeType.startsWith("video")) {
      setIsImage(false);
      setIsVideo(true);
      setIsSvg(false);
    }
    console.log("Rendering Image: ", { isImage, isVideo, isSvg, url, mimeType });
  }, [url, mimeType]);

  return (
    <>
      {isImage && <img src={url} />}
      {isSvg && <div
        className="svgImage"
        style={{
          background: url,
          width: "100%",
          height: 500
        }}>SVG</div>
      }
      {isVideo && <video className="videoThumbnail" src={url} loop={true} autoPlay={true} controls={true} />}
      {!isImage && !isVideo && !isSvg && <>NO IMAGE</>}
    </>
  );
};

const NFTImage = ({ url = "" }) => {
  const regexp = /^data:(?<mimetype>.*?);/;
  const [realUrl, setRealUrl] = useState(url);
  const [mimeType, setMimeType] = useState("unknown");
  useEffect(() => {
    let newUrl = realUrl;
    // grab the mime type out of the core svg value.
    if (realUrl.startsWith("data:image")) {
      const groups = realUrl.match(regexp);
      if (groups.length === 2) {
        // console.log("mediatype matches: ", { realUrl, groups, g: groups[1] });
        setMimeType(groups[1]);
      }
      // at this point we don't need to do any url gets/mimetypes so we fail out.
      return;
    }
    if (realUrl.toLowerCase().startsWith("ipfs://")) {
      let bits = url.split("ipfs://");
      if (bits[1].startsWith("ipfs/")) {
        // this is a sickening hack but we are dealing with metadata that is rubbish.
        bits = bits[1].split("ipfs/");
      }
      newUrl = `https://ipfs.io/ipfs/${bits[1]}`;
      setRealUrl(newUrl);
      // console.log("RealUrl", { url, realUrl, newUrl });
    }
    processUrlHead(newUrl).catch(e => {
      console.log("Error: ", e);
    });
  }, [url]);

  const processUrlHead = async (headUrl) => axios.head(headUrl)
                                                 .then((h) => {
                                                   setMimeType(h.headers["content-type"]);
                                                   // console.log("HeadVals: ", { headUrl, h });
                                                   return h;
                                                 }, (reason) => {
                                                   console.log("Error:", { headUrl, reason });
                                                 });

  const renderCallback = useCallback(() => {
    return <RenderNFTImage url={realUrl} mimeType={mimeType} />;
  }, [realUrl, mimeType]);

  return (
    <div className="image">
      {renderCallback()}
    </div>
  );
};

const GalleryView = () => {
  const [items, setItems] = React.useState(() => getItems(0, 10));

  return <MasonryInfiniteGrid
    className="container"
    gap={10}
    align={"justify"}
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
