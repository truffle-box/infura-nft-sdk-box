import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const FullSizeWrapper = styled.div`
  height: -webkit-fill-available;
  width: -webkit-fill-available;
`;

const NftDetails = () => {
  const location = useLocation();
  const { asset } = location.state;
  const fallbackImage =
    "https://img.freepik.com/premium-vector/80s-vintage-retro-sunset-landscape_1390-788.jpg?w=2000";

  return (
    <FullSizeWrapper className="item">
      <div className="thumbnail">
        <img src={asset?.image || fallbackImage} alt="" />
      </div>

      <div className="info">
        <div className="attribute">Name</div>
        <div>{asset?.name}</div>
      </div>

      <div className="info">
        <div className="attribute">Description</div>
        <div>{asset?.description}</div>
      </div>

      <div className="info">
        <div className="attribute">Attributes</div>
        {asset.properties &&
          Object.keys(asset?.properties).map((attribute) => {
            return <div> {`${attribute}: ${asset[attribute]}`}</div>;
          })}
      </div>
    </FullSizeWrapper>
  );
};

export default NftDetails;
