import React, { createContext, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useImmerReducer } from "use-immer";
import { initialState } from "./initialState.js";
import { reducer } from "../reducers";
import { Auth, SDK } from "@infura/sdk";

export const EthProvider = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const setAccount = useCallback(
    async (provider, accounts, networkName, chainId) => {
      if (accounts.length > 0) {
        try {
          const connectedAccount = {
            address: accounts[0],
          };
          dispatch({ type: "SET_ACCOUNT", payload: connectedAccount });
        } catch (e) {
          console.log(e);
        }
      } else {
        dispatch({ type: "SET_ACCOUNT", payload: initialState.user });
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
          privateKey: '135cbd17478a389c37b2ed4c1c232344ff386e283c3d09ed85f6fe0ea41164e2',
          projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
          secretId: process.env.REACT_APP_INFURA_PROJECT_SECRET,
          chainId,
        });
        const sdk = new SDK(auth);
        setAccount(provider, accounts, name, chainId);
        dispatch({
          type: "CONNECTED_PROVIDER",
          payload: {
            provider,
            signer,
            name,
            chainId,
            sdk
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

  const { isLoading, isConnected, name, chainId, provider, user, sdk, contract } =
    state;

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(provider, accounts);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <EthProvider.Provider
      value={{
        state,
        dispatch,
        isLoading,
        isConnected,
        provider,
        user,
        name,
        chainId,
        sdk,
        contract,
        actions: { connect },
      }}
    >
      {children}
    </EthProvider.Provider>
  );
};
