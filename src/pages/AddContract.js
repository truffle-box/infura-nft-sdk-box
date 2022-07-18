import React, { useState } from "react";
import CategorySelectorModal from "../components/molecules/CategorySelectorModal";
import { useStore } from "../state";


const ButtonChild = () => {
  const {contract, setContract} = useStore();
  return (
    <div>
      {contract}
      <button
        onClick={() => setContract("0x" + Math.random())}
      >
        genContract
      </button>
    </div>
  );
};

const AddContract = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const templates = ["Unlimited"];

  return (
    <>
      <fieldset>
        <legend>
          <h2 style={{fontWeight: '900'}}>Deploy a new Contract</h2>
          <p>Select one of the templates below to create a new contract</p>
        </legend>
      </fieldset>
      <fieldset>
        <CategorySelectorModal
          categories={templates}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </fieldset>
      <fieldset>
        <ButtonChild/>
      </fieldset>
    </>
  );
};

export default AddContract;
