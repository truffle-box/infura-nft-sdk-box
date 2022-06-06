import React, { useContext, useRef, useState } from "react";

import { LabeledInput as Input, TextArea } from "../components/atoms/Input";
import CategorySelector from "../components/molecules/CategorySelector";
import { EthProvider } from "../ethereum";

const AddContract = () => {
  const { contract } = useContext(EthProvider);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedInstallation, setSelectedInstallation] = useState("");
  const [selectedDapp, setSelectedDapp] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedIconUrl, setSelectedIconUrl] = useState("");
  const formRef = useRef();

  const templates = ["Unlimited", "UserMintable"];

  const inputs = [
    {
      label: "Token Name",
      description: "(name of your token)",
      placeholder: "",
      type: "text",
      name: "name",
    },
    {
      label: "Token Symbol",
      description: "(symbol of your token)",
      placeholder: "CSNSYS",
      type: "text",
      name: "symbol",
    },
    {
      label: "Contract URI",
      description: "(link)",
      placeholder: "e.g. ipfs://ajfa0sdjasfd0asfj",
      type: "text",
      name: "contract_uri",
    },
    {
      label: "Snap Image Link",
      description: "(A jpeg, png, or svg)",
      placeholder: "",
      type: "text",
      name: "iconUrl",
    },
  ];

  const wenSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.register(
        selectedName,
        selectedCategory,
        selectedInstallation,
        selectedIconUrl,
        selectedDapp,
        selectedDescription
      );
    } catch (e) {
      console.log(e);
    }
  };
  const setValue = (name, value) => {
    switch (name) {
      case "name":
        setSelectedName(value);
        return;
      case "installation":
        setSelectedInstallation(value);
        return;
      case "dapp":
        setSelectedDapp(value);
        return;
      case "iconUrl":
        setSelectedIconUrl(value);
        return;
      case "description":
        setSelectedDescription(value);
        return;
      default:
        return;
    }
  };

  return (
    <>
      <form action="" ref={formRef} onSubmit={wenSubmit}>
        <fieldset>
          <legend>
            <h2>Deploy a new Contract</h2>
            <p>Select one of the templates below to create a new contract</p>
          </legend>
          <CategorySelector
            categories={templates}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {inputs.map((input, idx) => (
            <Input
              type={input.type}
              placeholder={input.placeholder}
              label={input.label}
              key={`input no. ${idx}`}
              description={input.description}
              onChange={(event) => setValue(input.name, event.target.value)}
            />
          ))}
          <TextArea
            onChange={(event) => setValue("description", event.target.value)}
          />
          <input type="submit" value="Deploy"/>
        </fieldset>
      </form>
    </>
  );
};

export default AddContract;
