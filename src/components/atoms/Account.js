import Avvvatars from "avvvatars-react";
import React from "react";
import { formatAddress } from "../../utils";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrap = styled.div`
  height: 48px;
	background-color: #282828;
  display: flex;
  cursor: default;
  flex-direction: row;
  border-radius: 25px;
  position: relative;
	gap: 0.5em;
	align-items: center;
  > p {
		font-family:
    padding-bottom: 3px;
		padding-right: 1em;
  }
`;

const JazziconWrap = styled.div`
  border-radius: 50%;
  padding: 2px;
  height: 30px;
  width: 30px;
  img {
    border-radius: 50%;
    height: 30px;
    width: 30px;
  }
`;

const Account = () => {
  const user = useSelector((state) => state.user.user);
  const { address, avatar, ens } = user;

  return (
    <Wrap>
      <JazziconWrap>
        {avatar ? (
          <img src={avatar} alt="ENS Avatar" />
        ) : (
          <Avvvatars value={address} style="shape" size={30} />
        )}
      </JazziconWrap>
      <p style={{ color: "white" }}>{ens || formatAddress(address)}</p>
    </Wrap>
  );
};

export default Account;
