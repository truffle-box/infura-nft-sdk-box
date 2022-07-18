import { ReactNode } from 'react'

/**
 * I think now we don't need much of this, I have kept it right now as a place to store wider
 * hooks during execution.
 *
 * @constructor
 */
export const EthProvider = ({ children }: {children: ReactNode}) => {
  // const [state, dispatch] = useImmerReducer(reducer, initialState)
  //
  // const setAccount = useCallback(
  //   async (provider, accounts, networkName, chainId) => {
  //     if (accounts.length > 0) {
  //       try {
  //         const connectedAccount = {
  //           address: accounts[0]
  //         }
  //         dispatch({ type: 'SET_ACCOUNT', payload: connectedAccount })
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     } else {
  //       dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
  //     }
  //   },
  //   [dispatch]
  // )
  //
  // const connectUser = useCallback(async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     if (provider) {
  //       const signer = await provider.getSigner()
  //       const { name, chainId } = await provider.getNetwork()
  //       const accounts = await window.ethereum.request({
  //         method: 'eth_accounts'
  //       })
  //       const auth = new Auth({
  //         projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
  //         secretId: process.env.REACT_APP_INFURA_PROJECT_SECRET,
  //         chainId,
  //         provider: window.ethereum
  //       })
  //       const sdk = new SDK(auth)
  //       setAccount(provider, accounts, name, chainId)
  //       dispatch({
  //         type: 'CONNECTED_PROVIDER',
  //         payload: {
  //           provider,
  //           signer,
  //           name,
  //           chainId,
  //           sdk
  //         }
  //       })
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [setAccount, dispatch])
  //
  // useEffect(() => {
  //   if (window.ethereum) {
  //     connectUser()
  //
  //     window.ethereum.on('accountsChanged', () => {
  //       connectUser()
  //       window.location.replace('/')
  //     })
  //     window.ethereum.on('chainChanged', () => {
  //       connectUser()
  //       window.location.replace('/')
  //     })
  //   }
  // }, [connectUser, dispatch])
  //
  // const {
  //   isLoading,
  //   isConnected,
  //   name,
  //   chainId,
  //   provider,
  //   user,
  //   sdk,
  //   contract
  // } = state
  //
  // const connect = async () => {
  //   try {
  //     const accounts = await window.ethereum.request({
  //       method: 'eth_requestAccounts'
  //     })
  //     setAccount(provider, accounts)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  return (
    <>
      {children}
    </>
  )
}
