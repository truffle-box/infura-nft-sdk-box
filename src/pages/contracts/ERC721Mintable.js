import React, { useCallback, useContext, useEffect, useState } from "react";

import { Dialog } from "@headlessui/react";
import { EthProvider } from "../../ethereum";
import ModalDialog from "../../components/organisms/ModalDialog";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const StyledInput = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 1rem;
  width: 50rem;
  border: solid 0.1rem darkgray;
  font-size: 1rem;
  padding: 0.2rem 0.4rem;
`;

const StyleButton = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 1rem;
  display: block;
  margin: 1rem 0;
  background: #935dd7;
  color: #fff;
  font-weight: bold;
`;

const ERC721Mintable = () => {
  const [dialogText, setDialogText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [metadataUri, setMetadataUri] = useState("");
  const [bps, setBps] = useState("");
  const [respMsg, setRespMsg] = useState("");
  const [contract, setContract] = useState({ address: "", type: "" });

  const { name, sdk } = useContext(EthProvider);
  const user = useSelector((state) => state.user.user);
  const contractData = useSelector((state) => state.contract);

  useEffect(() => {
    sdk
      .loadContract({
        template: contractData.type,
        contractAddress: contractData.address,
      })
      .then((contract) => {
        setContract(contract);
      });
  }, []);

  const content = useCallback(() => {
    return (
      <>
        <Dialog.Panel className="p-5 w-full max-w-screen-md rounded-2xl bg-purpleLight">
          <Dialog.Title className="bg-purpleDark p-5 rounded-2xl mb-3 text-2xl text-white">
            Transaction Pending
          </Dialog.Title>
          <div className="bg-white p-5 rounded-2xl ">
            <Dialog.Description>
              Your transaction is pending, you can view it on etherscan.
              <a href={dialogText}>Click to View</a>
            </Dialog.Description>
            {/* content */}
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Dialog.Panel>
      </>
    );
  }, []);

  const mint = async () => {
    try {
      const mintPromise = contract
        .mint({
          publicAddress: user.address,
          tokenURI: metadataUri,
        })
        .then(
          (tx) => {
            setRespMsg(`Tx: ${tx}`);
            setIsOpen(true);
            const dialog = `https://${name}.etherscan.io/tx/${tx}`;
            setDialogText(dialog);
          },
          (reason) => {
            setRespMsg(`Reason: ${reason}`);
          }
        );

      toast
        .promise(mintPromise, {
          position: "top-right",
          pending: "🦄 - Minting Token",
          success: `Minted 👌: ${respMsg}`,
          error: `Error 🤯: ${respMsg}`,
        })
        .finally(() => {
          setIsOpen(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const setRoyalties = async () => {
    try {
      const royaltiesPromise = contract
        .setRoyalties({
          publicAddress: user.address,
          fee: parseInt(bps),
        })
        .then(
          (tx) => {
            setRespMsg(`Tx: ${tx}`);
          },
          (reason) => {
            setRespMsg(`Reason: ${reason}`);
          }
        );

      toast
        .promise(royaltiesPromise, {
          position: "top-right",
          pending: "🦄 - Setting Roylaties",
          success: `Set 👌: ${respMsg}`,
          error: `Error 🤯: ${respMsg}`,
        })
        .finally(() => {
          setIsOpen(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <h3 style={{ fontWeight: "900" }}>
          Interact with your NFT contract <small>({contract.address}</small>)
        </h3>
        <p>
          To mint a new NFT, simply paste in the metadata URI below and press
          mint.
        </p>
        <StyledInput
          placeholder="ipfs://"
          value={metadataUri}
          onChange={(e) => setMetadataUri(e.target.value)}
        />
        <StyleButton onClick={() => mint()}>Mint</StyleButton>
        <p>
          To set a royalty, use basis points to determine the percentage. You
          can calculate bps by multiplying your percentage by 100.
          <br />
          For example, if you want to do 1% of each sale, it would be 100bps. If
          you want 100% of the sales to go to the artist, it would be 10000 bps.
        </p>
        <StyledInput
          placeholder="0-10000 bps"
          value={bps}
          onChange={(e) => setBps(e.target.value)}
        />
        <StyleButton onClick={() => setRoyalties()}>Set Royalties</StyleButton>
      </div>
      <ModalDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        {content()}
      </ModalDialog>
    </>
  );
};

export default ERC721Mintable;
