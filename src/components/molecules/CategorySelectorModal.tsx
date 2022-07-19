import React, { useCallback, useState } from 'react'
import { classNames } from 'utils'

import ERC721MintableForm from './ERC721MintableForm'
import ERC721UserMintableForm from 'components/molecules/ERC721UserMintableForm'
import { Dialog } from '@headlessui/react'
import ModalDialog from '../organisms/ModalDialog'

const CategorySelectorModal = ({
  categories,
  selectedCategory,
  setSelectedCategory
}:{
  categories: string[],
  selectedCategory: string;
  setSelectedCategory: (v: string) => void
}) => {
  let [isOpen, setIsOpen] = useState(false)

  // this just returns the main elements of the dialog panel right now, it needs to be
  // passed into the modal to work/render properly.
  const content = useCallback(() => {
    return (
      <>
        <Dialog.Panel className="p-5 w-full max-w-screen-md rounded-2xl bg-purpleLight">
          <Dialog.Title className="bg-purpleDark p-5 rounded-2xl mb-3 text-2xl text-white">Deploy Contract</Dialog.Title>
          <div className="bg-white p-5 rounded-2xl ">
            <Dialog.Description>
              Fill in the details below to start create your new contract.
            </Dialog.Description>
            {/* content */}
            {selectedCategory === 'Unlimited' && <ERC721MintableForm setIsOpen={setIsOpen} />}
            {selectedCategory === 'UserMintable' && <ERC721UserMintableForm setIsOpen={setIsOpen} />}
            {/*<button onClick={() => setIsOpen(false)}>Cancel</button>*/}
          </div>
        </Dialog.Panel>
      </>
    )
  }, [selectedCategory])

  const clickButton = (idx: number) => {
    setSelectedCategory(categories[idx])
    setIsOpen(true)
  }

  return (
    <>
      <div className={'flex flex-col'}>
        <p>
          Template <span className="bg-purpleT">(Choose the best fit)</span>
        </p>
        <div className="pt-2">
          {categories.map((cat, idx) => (
            <button
              className={classNames(
                selectedCategory === cat ? 'bg-purpleDark text-white' : 'bg-white',
                'm-1'
              )}
              key={`category item ${idx + 1}`}
              onClick={() => clickButton(idx)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <ModalDialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        {content()}
      </ModalDialog>
    </>
  )
}

export default CategorySelectorModal
