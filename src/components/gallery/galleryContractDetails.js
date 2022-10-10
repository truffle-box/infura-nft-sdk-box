import React, { Suspense } from "react";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";

const MetaDataItem = styled.div`
  margin: auto;
  display: flex;
`;

const FlexWrapper = styled.div`
  display: flex !important;
`;

const FullSizeWrapper = styled.div`
  height: -webkit-fill-available;
  width: -webkit-fill-available;
`;

const SpaceTop = styled.div`
  margin-top: 10px;
`;

const CollectionTitle = styled.h1`
  margin: auto;
`;

const GalleryContractDetails = ({ contract }) => {
  const fallbackImage = "https://img.freepik.com/premium-vector/80s-vintage-retro-sunset-landscape_1390-788.jpg?w=2000";

  return (
    <Suspense fallback={<PuffLoader loading={true} />}>
      <FullSizeWrapper className="item">
        <div className="thumbnail">
          <img src={contract.metaData?.image || fallbackImage} alt="" />
        </div>
        <div className="info">
          <FlexWrapper className="title">
            <CollectionTitle>
              {contract?.metaData?.name} collection
            </CollectionTitle>
          </FlexWrapper>
          <SpaceTop>
            <FlexWrapper>
              <MetaDataItem>Symbol</MetaDataItem>
              <MetaDataItem>{contract?.metaData?.symbol}</MetaDataItem>
            </FlexWrapper>
            <FlexWrapper>
              <MetaDataItem>Token type</MetaDataItem>
              <MetaDataItem>{contract?.metaData?.tokenType}</MetaDataItem>
            </FlexWrapper>
          </SpaceTop>
        </div>
      </FullSizeWrapper>
    </Suspense>
  );
};

export default GalleryContractDetails;
