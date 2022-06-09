import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  a {
    font-family: "Euclid", serif;
    color: #24292e;
    text-decoration: none;
    letter-spacing: 0.75px;
  }
`;

const Anchor = ({ link, name, children }) => {
  return (
    <Wrap>
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
        title={`Link to ${name}`}
      >
        {children}
      </a>
    </Wrap>
  );
};

export default Anchor;
