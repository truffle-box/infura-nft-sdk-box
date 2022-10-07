import { Auth, SDK } from "@infura/sdk";
import React, { createContext, useCallback, useEffect } from "react";
import { disconnectUser, setUser } from "../redux/userSlice.js";

import { disconnectContract } from "../redux/contractSlice.js";
import { ethers } from "ethers";
import { initialState } from "./initialState.js";
import { reducer } from "../reducers";
import { useDispatch } from "react-redux";
import { useImmerReducer } from "use-immer";

export const EthProvider = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const dispatchRedux = useDispatch();

  const setAccount = useCallback(
    async (accounts) => {
      if (accounts.length > 0) {
        try {
          const connectedAccount = {
            address: accounts[0],
          };
          dispatchRedux(setUser(connectedAccount));
        } catch (e) {
          console.log(e);
        }
      } else {
        dispatchRedux(disconnectUser());
        dispatchRedux(disconnectContract());
      }
    },
    [dispatch]
  );

  const connectUser = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        const signer = await provider.getSigner();
        const { name, chainId } = await provider.getNetwork();
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const auth = new Auth({
          projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
          secretId: process.env.REACT_APP_INFURA_PROJECT_SECRET,
          chainId,
          provider: window.ethereum,
        });
        const sdk = new SDK(auth);
        setAccount(accounts);
        dispatch({
          type: "CONNECTED_PROVIDER",
          payload: {
            provider,
            signer,
            name,
            chainId,
            sdk,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [setAccount, dispatch]);

  useEffect(() => {
    if (window.ethereum) {
      connectUser();

      window.ethereum.on("accountsChanged", () => {
        connectUser();
        window.location.replace("/");
      });
      window.ethereum.on("chainChanged", () => {
        connectUser();
        window.location.replace("/");
      });
    }
  }, [connectUser, dispatch]);

  const { name, chainId, provider, sdk } = state;

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <EthProvider.Provider
      value={{
        state,
        dispatch,
        provider,
        name,
        chainId,
        sdk,
        actions: { connect },
      }}
    >
      {children}
    </EthProvider.Provider>
  );
};
