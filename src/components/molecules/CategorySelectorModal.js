import React, { useCallback, useState } from "react";

import ERC721MintableForm from "./ERC721MintableForm";
import ERC721UserMintableForm from "./ERC721UserMintableForm";
import { classNames } from "../utils";
import { Dialog } from "@headlessui/react";
import ModalDialog from "../organisms/ModalDialog";

// const Wrap = styled.div`
//   grid-area: category;
//   p {
//     span {
//       color: ${transparentize(0.3, "#24292E")};
//     }
//   }
//   div {
//     display: flex;
//     flex-direction: row;
//     gap: 1em;
//   }
// `;

// const Button = styled.div`
//   ${"" /* But can also make this fit-content */}
//   width: 100px;
//   padding: 0.5em;
//   cursor: pointer;
//   border-radius: 25px;
//   box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px,
//     rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
//   background-color: ${({ isSelected }) => (isSelected ? "#935DD7" : "#fff")};
//   color: ${({ isSelected }) => (isSelected ? "#fff" : "#24292E")};
// `;

const CategorySelectorModal = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  let [isOpen, setIsOpen] = useState(false);

  // this just returns the main elements of the dialog panel right now, it needs to be
  // passed into the modal to work/render properly.
  const content = useCallback(() => {
    return (
      <>
        <Dialog.Panel className="p-5 w-full max-w-screen-md rounded-2xl bg-purpleLight">
          <Dialog.Title className="bg-purpleDark p-5 rounded-2xl mb-3 text-2xl text-white">Deploy Contract</Dialog.Title>
          <div className="bg-white p-5 rounded-2xl ">
            <Dialog.Description>
              Fill in the details below to start create your new contract.
            </Dialog.Description>
            {/* content */}
            {selectedCategory === "Unlimited" && <ERC721MintableForm setIsOpen={setIsOpen} />}
            {selectedCategory === "UserMintable" && <ERC721UserMintableForm setIsOpen={setIsOpen} />}
            {/*<button onClick={() => setIsOpen(false)}>Cancel</button>*/}
          </div>
        </Dialog.Panel>
      </>
    );
  }, [selectedCategory]);

  const clickButton = (idx) => {
    setSelectedCategory(categories[idx]);
    setIsOpen(true);
  };

  return (
    <>
      <div className={"flex flex-col"}>
        <p>
          Template <span className="bg-purpleT">(Choose the best fit)</span>
        </p>
        <div className="pt-2">
          {categories.map((cat, idx) => (
            <button
              className={classNames(
                selectedCategory === cat ? "bg-purpleDark text-white" : "bg-white",
                "m-1"
              )}
              key={`category item ${idx + 1}`}
              onClick={() => clickButton(idx)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <ModalDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        {content()}
      </ModalDialog>
    </>
  );
};

export default CategorySelectorModal;
