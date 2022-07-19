// @ts-ignore
import {Auth, SDK as InfuraSDK} from '@infura/sdk'
import { SDK } from 'global'
import { useMemo } from 'react'
import { SUPPORTED_CHAIN_IDS } from 'chains'
import { hooks } from 'components/web3/connectors/metaMask'

const { useChainId, useProvider } = hooks

// Get the infura SDK and fix it when we change any of the web3 react provider/chainId elements.
export function useInfuraSdk (): SDK | undefined {
  const chainId = useChainId()
  const provider = useProvider()

  return useMemo(() => {

    if (!chainId || !provider) return undefined

    if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
      return undefined
    }
    const auth = new Auth({
      projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
      secretId: process.env.REACT_APP_INFURA_PROJECT_SECRET,
      chainId,
      provider: provider.provider
    })

    return new InfuraSDK(auth)
  }, [chainId, provider])
}
