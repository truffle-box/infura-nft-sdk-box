import React, { useContext, useRef, useState } from "react";
import { LabeledInput as Input } from "../atoms/Input";
import { EthProvider } from "../../ethereum";
import { TEMPLATES } from "@infura/sdk";
import { toast } from "react-toastify";

const ERC721MintableForm = ({ setIsOpen }) => {
  const { dispatch, sdk } = useContext(EthProvider);
  const [selectedName, setSelectedName] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedContractUri, setSelectedContractUri] = useState("");
  const formRef = useRef();

  // for the output of the TX
  const [respMsg, setRespMsg] = useState("");

  const inputs = [
    {
      label: "Token Name",
      description: "(name of your token)",
      placeholder: "",
      type: "text",
      name: "name"
    },
    {
      label: "Token Symbol",
      description: "(symbol of your token)",
      placeholder: "CSNSYS",
      type: "text",
      name: "symbol"
    },
    {
      label: "Contract URI",
      description: "(link)",
      placeholder: "e.g. ipfs://ajfa0sdjasfd0asfj",
      type: "text",
      name: "contract_uri"
    }
  ];

  const wenSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIXME: remove me eventually.
      // const contract = await sdk.deploy({
      //   template: TEMPLATES.ERC721Mintable,
      //   params: {
      //     name: selectedName,
      //     symbol: selectedSymbol,
      //     contractURI: selectedContractUri
      //   }
      // });
      // dispatch({
      //   type: "CONNECTED_CONTRACT",
      //   payload: {
      //     contract
      //   }
      // });
      let contractDeploymentPromise = () => new Promise((resolve, reject) => {
        let number = Math.random();
        // toast.info(`Number: ${number}`)
        if(number <= 0.5){
          setRespMsg("Failed. soz.")
          reject("Failed...")
        } else {
          setRespMsg("Gonna pass a good one...")
          return setTimeout(resolve, 3000);
        }
      });

      if(sdk){
        contractDeploymentPromise = sdk.deploy({
          template: TEMPLATES.ERC721Mintable,
          params: {
            name: selectedName,
            symbol: selectedSymbol,
            contractURI: selectedContractUri
          }
        })
        .then((contract) => {
          // got value
          setRespMsg(`Address: ${contract}`)
          // DISPATCH CONTRACT to your REDUX at this stage to save it???
          dispatch({
          type: "CONNECTED_CONTRACT",
          payload: {
            contract
          }
        });
        }, reason => {
          // error somewhere down in your promise...
          setRespMsg(`Reason: ${reason}`)
          // TODO: anything to add to redux here?

        });
      }

      // TODO: Fix this to wire in the promise up above...
      // const functionThatReturnPromise = () => new Promise(resolve => {
      //   return setTimeout(resolve, 3000);
      // });

      toast.promise(
        contractDeploymentPromise,
        {
          position: "top-right",
          pending: "🦄 - Contract Deploying - FAKE RIGHT NOW",
          success: `Deployed 👌: ${respMsg}`,
          error: `Error 🤯: ${respMsg}`
        }
      ).finally(() => {
        //  TODO: if your contract is successful or whatever you want to close the modal here:
        setIsOpen(false);
      });

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
