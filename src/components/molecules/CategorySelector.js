import React from "react";

import { transparentize } from "polished";
import styled from "styled-components";

const Wrap = styled.div`
  grid-area: category;
  p {
    span {
      color: ${transparentize(0.3, "#24292E")};
    }
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }
`;

const Button = styled.div`
  ${"" /* But can also make this fit-content */}
  width: 100px;
  padding: 0.5em;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background-color: ${({ isSelected }) => (isSelected ? "#935DD7" : "#fff")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#24292E")};
`;

const CategorySelector = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Wrap>
      <p>
        Template <span>(Choose the best fit)</span>
      </p>
      <div>
        {categories.map((cat, idx) => (
          <Button
            key={`category item ${idx + 1}`}
            isSelected={selectedCategory === cat}
            onClick={() => setSelectedCategory(categories[idx])}
          >
            {cat}
          </Button>
        ))}
      </div>
    </Wrap>
  );
};

export default CategorySelector;
