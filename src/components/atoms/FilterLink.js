import React from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";

const Wrap = styled(Link)`
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

const FilterLink = ({ link, name, icon, category, children, ...props }) => {
  let [searchParams] = useSearchParams();
  let isActive = searchParams.get("category") === category;

  return (
    <Wrap
      to={`/load-contract`}
      {...props}
      style={{
        ...props.style,
        fontWeight: isActive ? "600" : "400",
      }}
    >
      <p>
        <Icon alt={name} src={icon} />
        {name}
      </p>
    </Wrap>
  );
};

export default FilterLink;
