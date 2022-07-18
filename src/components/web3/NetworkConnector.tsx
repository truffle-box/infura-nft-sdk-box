import { useEffect, useState } from 'react'
import { Chain } from 'src/components/atoms/Chain'
import { Status } from 'src/components/atoms/Status'
import { hooks, metaMask } from './connectors/metaMask'
import { ConnectWithSelect } from './ConnectWithSelect'

const { useChainId, useIsActivating, useIsActive } = hooks

const NetworkConnector = () => {

  const chainId = useChainId()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const [error, setError] = useState<Error | undefined>(undefined)

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  return (
    <>
      <div className={'flex flex-row w-4/5 items-center align-middle justify-end gap-4'}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
        <Chain chainId={chainId} />
        <ConnectWithSelect
          connector={metaMask}
          chainId={chainId}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
          setError={setError}
        />
      </div>
    </>
  )
}

export default NetworkConnector
