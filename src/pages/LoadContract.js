import React, { useContext, useRef, useState } from "react";
import CategorySelector from "../components/molecules/CategorySelector";
import { LabeledInput as Input } from "../components/atoms/Input";
import { EthProvider } from "../ethereum";

const LoadContract = () => {
  const { sdk, dispatch } = useContext(EthProvider);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const formRef = useRef();

  const templates = ["Unlimited", "UserMintable"];

  const wenSubmit = async (e) => {
    e.preventDefault();
    const contract = await sdk.loadContract({
      template: 'ERC721Mintable',
      contractAddress: selectedContract,
    });
    console.log(contract);
    dispatch({
      type: "CONNECTED_CONTRACT",
      payload: {
        contract
      }
    });
  };

  return (
    <>
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
      </fieldset>
    <fieldset>
    <form action="" ref={formRef} onSubmit={wenSubmit}>
      <Input
        type="text"
        placeholder="0x..."
        label="Contract Address"
        description="This is the contract address previously deployed"
        onChange={(event) => setSelectedContract(event.target.value)}
      />
    <input type="submit" value="Load"/>
    </form>
    </fieldset>
  </>
  );
};

export default LoadContract;
