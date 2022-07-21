// @ts-ignore
import { TEMPLATES } from '@infura/sdk'
import { LabeledInput as Input } from 'components/atoms/Input'
import CategorySelector from 'components/molecules/CategorySelector'
import { useInfuraSdk } from 'hooks/useInfuraSdk'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useStore } from 'state'

const LoadContract = () => {

  const sdk = useInfuraSdk()
  const { setContractInstance, setContract } = useStore()

  const [formDisabled, setFormDisabled] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedContract, setSelectedContract] = useState('')
  const [message, setMessage] = useState<string>()
  const formRef = useRef<HTMLFormElement>(null)

  const templates = ['Unlimited']

  const wenSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!sdk) {
      alert('No Infura SDK configured!')
      return
    }
    if (!selectedCategory) {
      alert('Please select a template')
      return
    }
    if (!selectedContract) {
      alert('Please enter a contract address')
      return
    }

    e.preventDefault()
    const contract = await sdk.loadContract({
      template: TEMPLATES.ERC721Mintable,
      contractAddress: selectedContract
    })
    if (contract) {
      setContractInstance(contract)
      setContract(contract.contractAddress, contract.getTemplate())
      setMessage('Contract Loaded Successfully')
    } else {
      setMessage('Error loading contract')
    }
  }

  useEffect(() => {
    setFormDisabled(!(sdk && selectedCategory !== '' && selectedContract !== ''))
  }, [sdk, selectedCategory, selectedContract, setFormDisabled])

  return (
    <>
      <fieldset>
        <legend>
          <h2 style={{ fontWeight: '900' }}>Load an existing Contract</h2>
          <p>Select one of the templates below to load an existing contract</p>
        </legend>
      </fieldset>
      <fieldset>
        <form action="" ref={formRef} onSubmit={wenSubmit}>
          <CategorySelector
            categories={templates}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Input
            type="text"
            placeholder="0x..."
            label="Contract Address"
            description="This is the contract address previously deployed"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedContract(event.target.value)}
          />
          {formDisabled && <div className={'text-red-600 p-4 text-lg'}>Please select a Category and Contract address.</div>}
          {!formDisabled && <input type="submit" value="Load" disabled={formDisabled} />}
          {message && <div className={'p-4 text-lg'}>{message}</div>}
        </form>
      </fieldset>
    </>
  )
}

export default LoadContract
