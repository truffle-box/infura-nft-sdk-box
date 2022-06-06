import React, { useContext, useRef, useState } from "react";
import { LabeledInput as Input } from "../atoms/Input";
import { EthProvider } from "../../ethereum";

const ERC721MintableForm = () => {
  const { signer } = useContext(EthProvider);
  const [selectedName, setSelectedName] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
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
    console.log('submitting via sdk');
    // try {
    //   await sdk.deploy(
    //     selectedName,
    //     selectedSymbol,
    //     selectedContractUri,
    //   );
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const setValue = (name, value) => {
    switch (name) {
      case "name":
        setSelectedName(value);
        return;
      case "symbol":
        setSelectedSymbol(value);
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
          <input type="submit" value="Deploy"/>
        </fieldset>
      </form>
    </>
  );
};

export default ERC721MintableForm;
