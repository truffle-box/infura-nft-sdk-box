import React, { useRef, useState } from "react";
import CategorySelector from "../components/molecules/CategorySelector";
import { LabeledInput as Input } from "../components/atoms/Input";

const LoadContract = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const formRef = useRef();

  const templates = ["Unlimited", "UserMintable"];

  const wenSubmit = () => {

  };

  return (
    <>
    <form action="" ref={formRef} onSubmit={wenSubmit}>
      <fieldset>
      <legend>
            <h2>Load an existing Contract</h2>
            <p>Select one of the templates below to load an existing contract</p>
          </legend>
          <CategorySelector
            categories={templates}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Input
            type="text"
            placeholder="0x..."
            label="Contract Address"
            description="This is the contract address previously deployed"
            onChange={(event) => setSelectedContract(event.target.value)}
          />
        <input type="submit" value="Load"/>
      </fieldset>
    </form>
  </>
  );
};

export default LoadContract;
