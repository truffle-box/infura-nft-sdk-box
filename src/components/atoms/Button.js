import React, { useContext } from "react";
import styled from "styled-components";
import fox from "../../assets/fox.svg";
import { EthProvider } from "../../ethereum";
import { tap, hover } from "../../theme/FramerVariants.js";

const Wrap = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  img {
    height: 18px;
  }
`;

const Button = ({ children, icon = null }) => {
  const { actions } = useContext(EthProvider);
  const { connect } = actions;
  const icons = { fox };

  return (
    <Wrap onClick={() => connect()} whileHover={hover} whileTap={tap}>
      {icon && <img src={icons[icon]} alt="" />}
      {children}
    </Wrap>
  );
};

export default Button;
