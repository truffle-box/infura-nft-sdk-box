import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrap = styled(NavLink)`
  text-decoration: none;
  letter-spacing: 0.75px;
  color: #24292e;

  &.active {
    font-weight: 600;
  }
`;

const Icon = styled.img`
  position: relative;
  right: 3px;
  top: 2px;
`;

const MenuLink = ({ link, name, icon, children }) => {
  return (
    <Wrap to={link} end>
      <p>
        <Icon alt={name} src={icon} />
        {name}
      </p>
    </Wrap>
  );
};

export default MenuLink;
