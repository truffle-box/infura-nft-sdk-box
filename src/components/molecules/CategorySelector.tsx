import { transparentize } from 'polished'
import React from 'react'
import { classNames } from 'utils'
import styled from 'styled-components'

const Wrap = styled.div`
  grid-area: category;
  p {
    span {
      color: ${transparentize(0.3, '#24292E')};
    }
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }
`

// const Button = styled.div`
//   ${'' /* But can also make this fit-content */}
//   width: 100px;
//   padding: 0.5em;
//   cursor: pointer;
//   border-radius: 25px;
//   box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px,
//     rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
//   background-color: ${({ isSelected }) => (isSelected ? '#935DD7' : '#fff')};
//   color: ${({ isSelected }) => (isSelected ? '#fff' : '#24292E')};
// `

const CategorySelector = ({
  categories,
  selectedCategory,
  setSelectedCategory
}: {
  categories: string[],
  selectedCategory: string,
  setSelectedCategory: (v: string) => void
}) => {
  return (
    <div className={'flex flex-col'}>
      <p>
        Template <span>(Choose the best fit)</span>
      </p>
      <div className={'flex flex-row'}>
        {categories.map((cat, idx) => (
          <button
            key={`category item ${idx + 1}`}
            // isSelected={selectedCategory === cat}
            className={classNames(
              'm-2 px-4 py-2 rounded-full',
              selectedCategory === cat ? "bg-purpleDark text-white" : "bg-white"
            )}
            onClick={() => setSelectedCategory(categories[idx])}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector
