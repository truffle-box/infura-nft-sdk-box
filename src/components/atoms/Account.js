import React, { useContext } from "react";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import styled from "styled-components";

import { EthProvider } from "../../ethereum";
import { formatAddress } from "../../utils";

const Wrap = styled.div`
  align-items: center;
  border: 1px solid #bbc0c5;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 25px;
  display: flex;
  background-color: #fff;
  flex-direction: row;
  padding: 0.5em 0.75em;
  p {
    padding: 0;
    margin: 0;
    font-size: 16px;
    line-height: 16px;
  }
`;

const JazziconWrap = styled.div`
  border: 1px solid #000;
  border-radius: 50%;
  height: 20px;
  margin-left: 0.5rem;
  overflow: hidden;
  padding: 2px;
  width: 20px;
  > img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }
`;

const Account = () => {
  const { user, chainId } = useContext(EthProvider);
  const { address } = user;

  return (
    <Wrap>
      <p>{formatAddress(address)}</p>
      <JazziconWrap chainId={chainId}>
        <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
      </JazziconWrap>
    </Wrap>
  );
};

export default Account;
