// @ts-ignore
import { TEMPLATES } from '@infura/sdk'
import { ERC721Mintable } from 'global'
import React, { FormEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useInfuraSdk } from 'hooks/useInfuraSdk'
import { useStore } from 'state'
import { LabeledInput as Input } from '../atoms/Input'

const ERC721MintableForm = ({ setIsOpen }: { setIsOpen: (val: boolean) => void }) => {
  const sdk = useInfuraSdk()
  const { setContract, setContractInstance, contract } = useStore()

  const [selectedName, setSelectedName] = useState('')
  const [selectedSymbol, setSelectedSymbol] = useState('')
  const [selectedContractUri, setSelectedContractUri] = useState('')
  const [isError, setIsError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [respMsg, setRespMsg] = useState('')

  const inputs = [
    {
      label: 'Token Name',
      description: '(name of your token)',
      placeholder: '',
      type: 'text',
      name: 'name'
    },
    {
      label: 'Token Symbol',
      description: '(symbol of your token)',
      placeholder: 'CSNSYS',
      type: 'text',
      name: 'symbol'
    },
    {
      label: 'Contract URI',
      description: '(link)',
      placeholder: 'e.g. ipfs://ajfa0sdjasfd0asfj',
      type: 'text',
      name: 'contract_uri'
    }
  ]

  const wenSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (sdk) {
        const contractDeploymentPromise = sdk.deploy({
          template: TEMPLATES.ERC721Mintable,
          params: {
            name: selectedName,
            symbol: selectedSymbol,
            contractURI: selectedContractUri
          }
        })
          .then((contract: ERC721Mintable) => {
            // TODO: this is a complex contract object, not an address. Can't be put in state.
            setRespMsg(`Address: ${contract.contractAddress}`)
            setContract(contract.contractAddress, contract.getTemplate())
            setContractInstance(contract)
            setIsError(false)
          })

        await toast.promise(
          contractDeploymentPromise,
          {
            pending: '🦄 - Contract Deploying',
            success: `Deployed 👌: ${respMsg}`,
            error: `Error 🤯: ${respMsg}`
          }, {
            position: 'top-right'
          }
        )
          .finally(() => {
            setIsOpen(false)
          })
      } else {
        toast.error(' 🤯: No SDK Present/Configured')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const setValue = (name: string, value: string) => {
    switch (name) {
      case 'name':
        setSelectedName(value)
        return
      case 'symbol':
        setSelectedSymbol(value)
        return
      case 'contract_uri':
        setSelectedContractUri(value)
        return
      default:
        return
    }
  }

  return (
    <>
      <form action="" ref={formRef} onSubmit={wenSubmit}>
        <fieldset>
          {inputs.map((input, idx) => (
            <Input
              type={input.type}
              placeholder={input.placeholder}
              label={input.label}
              key={`input no. ${idx}`}
              description={input.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(input.name, event.target.value)}
            />
          ))}
        </fieldset>
        <div className="flex flex-row justify-end gap-4 align-bottom w-full">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <input type="submit" value="Deploy" />
        </div>
      </form>
      <div>
        Error?: {isError}<br />
        Message: {respMsg}<br />
        Selected Contract : {contract?.address}<br />
      </div>
    </>
  )
}

export default ERC721MintableForm
