import React, { useContext, useEffect, useRef, useState } from "react";

import CategorySelector from "../components/molecules/CategorySelector";
import { EthProvider } from "../ethereum";
import { LabeledInput as Input } from "../components/atoms/Input";
import { TEMPLATES } from "@infura/sdk";
import { setContract } from "../redux/contractSlice";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const LoadButton = styled.input`
  margin-left: 10px;
`;

const LoadContract = () => {
  const { sdk } = useContext(EthProvider);
  const contract = useSelector((state) => state.contract);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const formRef = useRef();
  const dispatchRedux = useDispatch();

  const templates = ["Unlimited", "Other"];

  const wenSubmit = async (e) => {
    if (!selectedCategory) {
      alert("Please select a template");
      return;
    }
    e.preventDefault();
    const load = async () => {
      const contract = await sdk.loadContract({
        template: TEMPLATES.ERC721Mintable,
        contractAddress: selectedContract,
      });
      const metaData = await sdk.getContractMetadata({
        contractAddress: contract.contractAddress,
      });

      dispatchRedux(
        setContract({
          address: contract.contractAddress,
          type: TEMPLATES.ERC721Mintable,
          metaData,
        })
      );
    };

    toast.promise(load, {
      position: "top-right",
      pending: "🦄 - Loading",
      success: contract.metaData
        ? `Contract ${contract.metaData.name} loaded 👌`
        : `Loaded 👌`,
      error: `Error 🤯`,
    });
  };

  return (
    <>
      <fieldset>
        <legend>
          <h2 style={{ fontWeight: "900" }}>Load an existing Contract</h2>
          <p>Select one of the templates below to load an existing contract</p>
        </legend>
      </fieldset>
      <fieldset>
        <form action="" ref={formRef} onSubmit={wenSubmit}>
          <CategorySelector
            className="pt-2"
            categories={templates}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="pt-2">
            <Input
              type="text"
              placeholder="0x..."
              label="Contract Address"
              description="This is the contract address previously deployed"
              onChange={(event) => setSelectedContract(event.target.value)}
            />
            <LoadButton type="submit" value="Load" />
          </div>
        </form>
      </fieldset>
    </>
  );
};

export default LoadContract;
