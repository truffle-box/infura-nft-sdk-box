import { getAddress } from '@ethersproject/address'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import type { Connector } from '@web3-react/types'

export function getName (connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask'
  if (connector instanceof Network) return 'Network'
  return 'Unknown'
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress (address: string, chars = 4): string {
  try {
    const parsed = getAddress(address)
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
  } catch (error) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
}

export function classNames (...n: string[]) {
  return n.filter(Boolean).join(' ')
}
