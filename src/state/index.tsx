// @ts-ignore
import { Auth, SDK } from "@infura/sdk";
import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import produce from "immer";
//import detectEthereumProvider from '@metamask/detect-provider';
import * as lodash from "lodash";
import { useCallback, useEffect } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


export type AppState = {
  // binaries: {
  //   provider: providers.Web3Provider | null,
  //   signer: any | null,
  //   sdk: any | null,
  // },
  contract: string | null,
  isLoading: boolean,
  isConnected: boolean,
  name: string | null,
  chainId: string | null,
  user: {
    accounts: string[],
    address: string,
    ens: string | null,
    avatar: string | null,
  },
};

type ProviderPayload = {
  provider: providers.Web3Provider,
  signer: any,
  name: string,
  chainId: number,
  sdk: any
}

export type AppStateFunctions = {
  setContract: (address: string) => void
  setProvider: (payload: ProviderPayload) => void
  setChainId: (chainId: string) => void,
  setSigner: (signer: string) => void,
  setUser: (user: Record<string, any>) => void
}


export type NftAppState = AppState & AppStateFunctions;

const initialState: AppState = {
  // binaries: {
  //   provider: null,
  //   signer: null,
  //   sdk: null,
  // },
  contract: null,
  isLoading: true,
  isConnected: false,
  name: null,
  chainId: null,
  user: {
    accounts: [],
    address: "",
    ens: null,
    avatar: null
  }
};

//export const { Provider, useStore } = createContext<StoreApi<NftAppState>>();

export const useStore = create<NftAppState>()(
  immer(persist((set) => ({
    ...initialState,
    setContract: (address) => set(produce((state: NftAppState) => {
      state.contract = address;
    })),
    setProvider: (payload) => set(produce((state) => {
      // state.binaries.provider = payload.provider;
      // state.provider = payload.provider;
      // state.signer = payload.signer;
      state.name = payload.name;
      state.chainId = payload.chainId;
      // state.sdk = payload.sdk;
    })),
    setChainId: (chainId) => set(produce((state) => {
      state.chainId = chainId;
    })),
    setSigner: (signer) => set(produce((state) => {
      state.signer = signer;
    })),
    setUser: (user) => set(produce((state) => {
      state.user = user;
    }))

  }), {
    name: "nft-api-box",
    version: 1,
    serialize: state => JSON.stringify(lodash.omit(state, ["binaries"]))
  }))
);

type EthProviderArgs = {
  children: any
}


export const EthProvider = ({ children }: EthProviderArgs) => {

  const store = useStore();
  const context = useWeb3React<providers.Web3Provider>();

  const setUser = useCallback(
    async (provider: providers.Web3Provider, accounts: string[]) => {
      if (accounts.length > 0) {
        try {
          const connectedAccount = {
            address: accounts[0]
          };
          store.setUser(connectedAccount);
        } catch (e) {
          console.log(e);
        }
      } else {
        store.setUser(initialState.user);
      }
    },
    [store]
  );

  const connectUser = useCallback(async () => {
    try {
      if (context && context.provider) {
        const provider = context.provider;
        const { chainId } = await provider.getNetwork();
        const accounts = await provider.listAccounts();
        const auth = new Auth({
          projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
          secretId: process.env.REACT_APP_INFURA_PROJECT_SECRET,
          chainId,
          provider
        });
        // FIXME: rework this stuff...
        const signer = await provider.getSigner();
        const sdk = new SDK(auth);
        await setUser(provider, accounts);
      }
    } catch (e) {
      console.log(e);
    }
  }, [store, setUser, context]);

  useEffect(() => {
    if (context.provider) {
      connectUser();
      const provider = context.provider;
      provider.on("accountsChanged", (...args) => {
        console.log(`accountsChanged: `, { ...args });
        connectUser();
        window.location.replace("/");
      });
      provider.on("chainChanged", (...args) => {
        console.log(`chainChanged: `, { ...args });
        connectUser();
        window.location.replace("/");
      });
    }
  }, [connectUser, context]);

  return (
    // <Provider createStore={createStore}>
    <>
      {children}
    </>
    // </Provider>
  );
};
