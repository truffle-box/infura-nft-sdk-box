import { ERC721Mintable } from 'global'
import * as lodash from 'lodash'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export type AppState = {
  contract: {
    address: string | null,
    template: string | null,
  },
  // we need to omit this in persisting as its a complex object.
  contractInstance: ERC721Mintable | null,
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

export type AppStateFunctions = {
  // used to store state later on???
  setContract: (address: string, template: string) => void
  setContractInstance: (contractInstance: ERC721Mintable) => void
  setChainId: (chainId: string) => void,
  setUser: (user: any) => void
}

export type NftAppState = AppState & AppStateFunctions;

const initialState: AppState = {
  contract: {
    address: null,
    template: null
  },
  contractInstance: null,
  isLoading: true,
  isConnected: false,
  name: null,
  chainId: null,
  user: {
    accounts: [],
    address: '',
    ens: null,
    avatar: null
  }
}

export const useStore = create<NftAppState>()(
  persist((set) => ({
    ...initialState,
    setContract: (address, template) => set((_state) => ({
      contract: {
        address,
        template
      }
    })),
    setContractInstance: contractInstance => set((_state) => ({
      contract: {
        address: contractInstance.contractAddress,
        template: contractInstance.getTemplate()
      },
      contractInstance
    })),
    setChainId: (chainId) => set((_state) => ({ chainId })),
    setUser: (user) => set((_state) => ({ user }))
  }), {
    name: 'nft-api-box',
    version: 1,
    partialize: state => lodash.omit(state, ['contractInstance'])
  })
)
