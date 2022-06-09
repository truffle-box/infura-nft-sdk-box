import React from "react";
import styled from "styled-components";

import phones from "../../assets/phones.svg";
import topBanner from "../../assets/top_banner.svg";

const Wrap = styled.div`
  height: fit-content;
  width: 100%;
  position: relative;
  img:first-of-type {
    width: 100%;
  }
  img:last-of-type {
    width: 20vw;
    position: absolute;
    right: 0;
    top: -1rem;
  }
`;

const TopBanner = () => {
  return (
    <Wrap>
      <img src={topBanner} alt="Top Banner" />
      <img src={phones} alt="Floating Phones" />
    </Wrap>
  );
};

export default TopBanner;
