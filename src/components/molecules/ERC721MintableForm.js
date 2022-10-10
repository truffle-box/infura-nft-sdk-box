import React, { useContext, useRef, useState } from "react";

import { EthProvider } from "../../ethereum";
import { LabeledInput as Input } from "../atoms/Input";
import { TEMPLATES } from "@infura/sdk";
import { setContract } from "../../redux/contractSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ERC721MintableForm = ({ setIsOpen }) => {
  const { sdk } = useContext(EthProvider);
  const [selectedName, setSelectedName] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedContractUri, setSelectedContractUri] = useState("");
  const formRef = useRef();

  const dispatchRedux = useDispatch();

  const [respMsg, setRespMsg] = useState("");

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
    e.preventDefault();
    try {
      if (sdk) {
        const contractDeploymentPromise = sdk
          .deploy({
            template: TEMPLATES.ERC721Mintable,
            params: {
              name: selectedName,
              symbol: selectedSymbol,
              contractURI: selectedContractUri,
            },
          })
          .then(
            (contractAddress) => {
              setRespMsg(`Address: ${contractAddress}`);
              dispatchRedux(
                setContract({
                  address: contractAddress,
                  type: TEMPLATES.ERC721Mintable,
                })
              );
            },
            (reason) => {
              setRespMsg(`Reason: ${reason}`);
            }
          );

        toast
          .promise(contractDeploymentPromise, {
            position: "top-right",
            pending: "🦄 - Contract Deploying",
            success: `Deployed 👌: ${respMsg}`,
            error: `Error 🤯: ${respMsg}`,
          })
          .finally(() => {
            setIsOpen(false);
          });
      }
    } catch (e) {
      console.log(e);
    }
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
        </fieldset>
        <div className="flex flex-row justify-end gap-4 align-bottom w-full">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <input type="submit" value="Deploy" />
        </div>
      </form>
    </>
  );
};

export default ERC721MintableForm;
