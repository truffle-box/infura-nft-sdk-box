import React from "react";

import styled from "styled-components";

const Container = styled.button`
  border: 2px solid #9c5add;
  background-color: transparent;
  padding: 0.25em 0.5em;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  height: 2.5em;
  grid-area: install;
  font-family: "Euclid", serif;
`;

const InstallButton = ({ installation }) => {
  // onClick function that calls the wallet_enable json-rpc method

  return (
    <Container onClick={() => installSnap(installation)}>Install</Container>
  );
};

async function installSnap(installation) {
  const path = `npm:${installation}`;

  /* global ethereum */
  await ethereum.request({
    method: "wallet_enable",
    params: [
      {
        wallet_snap: {
          [path]: {
            version: "latest",
          },
        },
      },
    ],
  });
}

export default InstallButton;
