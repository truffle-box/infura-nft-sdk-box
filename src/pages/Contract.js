import { TEMPLATES } from '@infura/sdk'
import React from 'react'
import ERC721Mintable from './contracts/ERC721Mintable'
import { useStore } from '../state'

const Contract = () => {
  const {contract} = useStore();

  return (
    <>{contract.template === TEMPLATES.ERC721Mintable && <ERC721Mintable />}</>
  )
}

export default Contract
