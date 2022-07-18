import { Dialog } from '@headlessui/react'
import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import React, { useCallback, useState } from 'react'
// @ts-ignore
import fox from 'src/assets/fox.svg'
import { CHAINS, getAddChainParameters, URLS } from 'src/chains'
import { Accounts } from 'src/components/atoms/Accounts'
import { Chain } from 'src/components/atoms/Chain'
import { Status } from 'src/components/atoms/Status'
import ModalDialog from 'src/components/organisms/ModalDialog'

function ChainSelect ({
  chainId,
  switchChain,
  displayDefault,
  chainIds
}: {
  chainId: number | undefined
  switchChain: ((chainId: number) => void) | undefined
  displayDefault: boolean
  chainIds: number[]
}) {
  return (
    <select
      className={'border rounded-full bg-gray-100 p-3'}
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value))
      }}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <option value={-1}>Default Chain</option> : null}
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  )
}

interface Props {
  connector: MetaMask | Network;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}

export function ConnectWithSelect ({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const isNetwork = connector instanceof Network
  const displayDefault = !isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) => Number(chainId))
  const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : -1)

  const tryActivate = useCallback((_desiredChainId: number) => {
    if (connector instanceof Network) {
      connector
        .activate(_desiredChainId === -1 ? undefined : _desiredChainId)
        .then(() => setError(undefined))
        .catch(setError)
    } else {
      connector
        .activate(_desiredChainId === -1 ? undefined : getAddChainParameters(_desiredChainId))
        .then(() => setError(undefined))
        .catch(setError)
    }
  }, [connector, setError])

  const switchChain = useCallback(
    (_desiredChainId: number) => {
      setDesiredChainId(_desiredChainId)
      // if we're already connected to the desired chain, return
      if (_desiredChainId === chainId) {
        setError(undefined)
        return
      }

      // if they want to connect to the default chain and we're already connected, return
      if (_desiredChainId === -1 && chainId !== undefined) {
        setError(undefined)
        return
      }
      tryActivate(_desiredChainId)
    },
    [tryActivate, chainId, setError]
  )

  const onClick = useCallback((): void => {
    setError(undefined)
    tryActivate(desiredChainId)
  }, [tryActivate, desiredChainId, setError])

  if (error) {
    return (
      <div className={'flex flex-row'}>
        <ChainSelect
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button onClick={onClick}>Try Again?</button>
      </div>
    )
  } else if (isActive) {
    return (
      <div className={'flex flex-row w-1/5'}>

        <button
          className={'p-0 m-0 w-full'}
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <Accounts style={'lozenge'} />
        </button>
        <ModalDialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
          <>
            <Dialog.Panel className="p-5 w-full max-w-screen-md rounded-2xl bg-purpleLight">
              <Dialog.Title className="bg-purpleDark p-5 rounded-2xl mb-3 text-xl text-white">
                Connected Account: <Accounts shorten={false} /></Dialog.Title>
              <div className="bg-white p-5 rounded-2xl ">
                <Dialog.Description className={'text-xl'}>
                  Connection Options
                </Dialog.Description>
                <hr />
                {/* content */}
                <div className={'mt-4 flex flex-col gap-3'}>
                  <Status isActivating={isActivating} isActive={isActive} error={error} />
                  <Chain chainId={chainId} />
                  <div>Change Network: <ChainSelect
                    chainId={desiredChainId === -1 ? -1 : chainId}
                    switchChain={switchChain}
                    displayDefault={displayDefault}
                    chainIds={chainIds}
                  /></div>
                  <button
                    onClick={() => {
                      if (connector?.deactivate) {
                        void connector.deactivate()
                      } else {
                        void connector.resetState()
                      }
                      // close dialog
                      setIsOpen(false)
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </>
        </ModalDialog>

      </div>
    )
  } else {
    return (
      <div className={'flex flex-row'}>
        <button
          className={'flex flex-row align-middle justify-center gap-2'}
          onClick={
            isActivating
              ? undefined
              : () => connector instanceof Network ?
                connector
                  .activate(desiredChainId === -1 ? undefined : desiredChainId)
                  .then(() => setError(undefined))
                  .catch(setError)
                : connector
                  .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
                  .then(() => setError(undefined))
                  .catch(setError)
          }
          disabled={isActivating}
        >
          <img src={fox} width={30} alt={'foxy'} />
          Connect with Wallet
        </button>
      </div>
    )
  }
}
