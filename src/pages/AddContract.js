import React, { useState } from "react";

import CategorySelector from "../components/molecules/CategorySelector";
import ERC721MintableForm from "../components/molecules/ERC721MintableForm";
import ERC721UserMintableForm from "../components/molecules/ERC721UserMintableForm";

const AddContract = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const templates = ["Unlimited", "UserMintable"];

  return (
    <>
      <fieldset>
        <legend>
          <h2>Deploy a new Contract</h2>
          <p>Select one of the templates below to create a new contract</p>
        </legend>
        
      </fieldset>
      <fieldset>
      <CategorySelector
          categories={templates}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory === "Unlimited" && <ERC721MintableForm />}
        {selectedCategory === "UserMintable" && <ERC721UserMintableForm />}
      </fieldset>
    </>
  );
};

export default AddContract;
