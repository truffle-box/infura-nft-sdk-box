import React, { useContext, useRef, useState } from "react";
import { LabeledInput as Input } from "../atoms/Input";
import { EthProvider } from "../../ethereum";

const ERC721UserMintableForm = ({setIsOpen}) => {
  const { signer } = useContext(EthProvider);
  const [selectedName, setSelectedName] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedBaseUri, setSelectedBaseUri] = useState("");
  const [selectedMaxSupply, setSelectedMaxsupply] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedContractUri, setSelectedContractUri] = useState("");
  const formRef = useRef();

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
      label: "Base URI",
      description: "(base URI with information)",
      placeholder: "myapp.com/metadata",
      type: "text",
      name: "base_uri",
    },
    {
      label: "Max Supply",
      description: "(maximum supply for your token)",
      placeholder: "",
      type: "number",
      name: "max_supply",
    },
    {
      label: "Mint Price",
      description: "(price of token at mint)",
      placeholder: "",
      type: "number",
      name: "mint_price",
    },
    {
      label: "Contract URI",
      description: "(link)",
      placeholder: "e.g. ipfs://ajfa0sdjasfd0asfj",
      type: "text",
      name: "contract_uri",
    },
  ];

  const wenSubmit = async (e) => {
    const sdk = {}; // TODO: Add Infura SDK

    e.preventDefault();
    console.log("submitting via sdk");
  };
  const setValue = (name, value) => {
    switch (name) {
      case "name":
        setSelectedName(value);
        return;
      case "symbol":
        setSelectedSymbol(value);
        return;
      case "base_uri":
        setSelectedBaseUri(value);
        return;
      case "max_suuply":
        setSelectedMaxsupply(value);
        return;
      case "symbol":
        setSelectedPrice(value);
        return;
      case "contract_uri":
        setSelectedContractUri(value);
        return;
      default:
        return;
    }
  };

  return (
    <>
      <form action="" ref={formRef} onSubmit={wenSubmit}>
        <fieldset>
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
        </fieldset>
        <div className="flex flex-row justify-end gap-4 align-bottom w-full">
          <button onClick={() => setIsOpen(false)}>Cancel</button> <input type="submit" value="Deploy" />
        </div>
      </form>
    </>
  );
};

export default ERC721UserMintableForm;
