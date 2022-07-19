import React from 'react'
import add from '../../assets/add.svg'
import categories from '../../assets/categories.svg'
import nft from '../../assets/nft.svg'
import protocols from '../../assets/protocols.svg'
import icon_stars from '../../assets/icon_stars.svg'
import { useStore } from '../../state'
import MenuLink from '../atoms/MenuLink'

const Nav = () => {
  const { contract } = useStore()
  return (
    <nav>
      <MenuLink link="/" name="Home" icon={categories} />
      <div className="relative left-2">
        {contract && contract.address && (
          <MenuLink link="/contract" name="Contract" icon={icon_stars} />
        )}
        <MenuLink link="/gallery" name="Album" icon={nft} />
        <MenuLink link="/load-contract" name="Load Contract" icon={protocols} />
        <MenuLink link="/add-contract" name="Add New Contract" icon={add} />
      </div>
    </nav>
  )
}

export default Nav
