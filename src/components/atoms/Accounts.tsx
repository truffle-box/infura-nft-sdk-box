import type { BigNumber } from '@ethersproject/bignumber'
import type { Web3ReactHooks } from '@web3-react/core'
import Avvvatars from 'avvvatars-react'
import { useEffect, useState } from 'react'
import { hooks } from 'components/web3/connectors/metaMask'
import { shortenAddress } from 'utils'

const { useIsActive, useProvider, useAccount, useENSName } = hooks

function useBalances (
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[] | undefined
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (stale) return
        setBalances(balances)
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

export function Accounts ({
  shorten = true,
  style = 'text'
}: {
  shorten?: boolean,
  showBalance?: boolean
  style?: 'text' | 'lozenge'
}) {
  const address = useAccount()
  const provider = useProvider()
  const ens = useENSName(provider)
  const isActive = useIsActive();

  const [accountDisplay, setAccountDisplay] = useState(address)

  useEffect(() => {
    if (shorten && address) {
      setAccountDisplay(shortenAddress(address))
    }
  }, [address, shorten])

  if(!isActive) return <>NOT ACTIVE</>
  if (address === undefined) return null

  if (style === 'text') {
    return (
      <div className={'w-full'}>
          <div className={''}>
            {ens ? ens : accountDisplay}
            {/*{showBalance && balances?.[0] ? ` (Ξ${formatEther(balances[0])})` : null}*/}
          </div>
      </div>
    )
  } else {
    return (
      <div className={'flex flex-row bg-gray-800 rounded-full p-2 justify-left items-center gap-4'}>
        <div className={'h-[30px] rounded-full'}>
          {address && <Avvvatars value={address} style="shape" size={30} />}
        </div>
        {address &&
          <div className={'text-white'}>{ens || shortenAddress(address)}</div>
        }
      </div>
    )
  }

}
