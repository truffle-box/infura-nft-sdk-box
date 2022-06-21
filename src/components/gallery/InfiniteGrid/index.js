import React, { Suspense, useContext, useEffect, useState } from "react";
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

// const RenderNFTImage = ({ url, mimeType }) => {
//   const [isImage, setIsImage] = useState(false);
//   const [isVideo, setIsVideo] = useState(false);
//   const [isSvg, setIsSvg] = useState(false);

//   useEffect(() => {
//     // set the hoobmajoob
//     if (mimeType.startsWith("image")) {
//       setIsImage(true);
//       setIsVideo(false);
//       setIsSvg(false);
//     }
//     if (mimeType.startsWith("video")) {
//       setIsImage(false);
//       setIsVideo(true);
//       setIsSvg(false);
//     }
//     console.log("Rendering Image: ", {
//       isImage,
//       isVideo,
//       isSvg,
//       url,
//       mimeType,
//     });
//   }, [url, mimeType]);

//   return (
//     <>
//       {isImage && <img src={url} />}
//       {isSvg && (
//         <div
//           className="svgImage"
//           style={{
//             background: url,
//             width: "100%",
//             height: 500,
//           }}
//         >
//           SVG
//         </div>
//       )}
//       {isVideo && (
//         <video
//           className="videoThumbnail"
//           src={url}
//           loop={true}
//           autoPlay={true}
//           controls={true}
//         />
//       )}
//       {!isImage && !isVideo && !isSvg && <>NO IMAGE</>}
//     </>
//   );
// };

// const NFTImage = ({ url = "" }) => {
//   const regexp = /^data:(?<mimetype>.*?);/;
//   const [realUrl, setRealUrl] = useState(url);
//   const [mimeType, setMimeType] = useState("unknown");
//   useEffect(() => {
//     let newUrl = realUrl;
//     // grab the mime type out of the core svg value.
//     if (realUrl.startsWith("data:image")) {
//       const groups = realUrl.match(regexp);
//       if (groups.length === 2) {
//         // console.log("mediatype matches: ", { realUrl, groups, g: groups[1] });
//         setMimeType(groups[1]);
//       }
//       // at this point we don't need to do any url gets/mimetypes so we fail out.
//       return;
//     }
//     if (realUrl.toLowerCase().startsWith("ipfs://")) {
//       let bits = url.split("ipfs://");
//       if (bits[1].startsWith("ipfs/")) {
//         // this is a sickening hack but we are dealing with metadata that is rubbish.
//         bits = bits[1].split("ipfs/");
//       }
//       newUrl = `https://ipfs.io/ipfs/${bits[1]}`;
//       setRealUrl(newUrl);
//       // console.log("RealUrl", { url, realUrl, newUrl });
//     }
//     processUrlHead(newUrl).catch((e) => {
//       console.log("Error: ", e);
//     });
//   }, [url]);

//   const processUrlHead = async (headUrl) =>
//     axios.head(headUrl).then(
//       (h) => {
//         setMimeType(h.headers["content-type"]);
//         // console.log("HeadVals: ", { headUrl, h });
//         return h;
//       },
//       (reason) => {
//         console.log("Error:", { headUrl, reason });
//       }
//     );

//   const renderCallback = useCallback(() => {
//     return <RenderNFTImage url={realUrl} mimeType={mimeType} />;
//   }, [realUrl, mimeType]);

//   return <div className="image">{renderCallback()}</div>;
// };

const GalleryView = () => {
  const [items, setItems] = useState([]);

  const { sdk, contract } = useContext(EthProvider);

  // make this contingent on a valid contract address...
  const start = async (contractAddress) => {
    const data = await sdk.getNFTs({
      publicAddress: contractAddress,
      includeMetadata: true
    });

    const items = [];
    for (let i = 0; i < data.assets.length; ++i) {
      console.log(data.assets[i].metadata);
      items.push(data.assets[i].metadata);
    }
    setItems(items);
  };

  useEffect(() => {
    if (contract && contract.contractAddress) {
      console.log("Working with contract", { contract });
      start(contract.contractAddress);
    } else {
      console.log("Contract is null...");
      setItems([]);
    }
  }, [start, contract]);

  return (<>
    {items.length > 0 ?
      items.map((item) => (
        <Item
          data-grid-groupkey={item.groupKey}
          key={item.key}
          num={item.key}
          asset={item}
        />)
      ) :
      (<div>Loading...</div>)
    }
  </>);
};

export default GalleryView;
