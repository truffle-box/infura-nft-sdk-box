import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'

import './index.css'
import { useStore } from '../../state'
import { useInfuraSdk } from '../../hooks/useInfuraSdk'

const Item = ({ asset }) => (
  <Suspense fallback={<PuffLoader loading={true} />}>
    <div className="item">
      <div className="thumbnail">
        <img src={asset?.image} alt="" />
      </div>
      <div className="info">
        <div className="title">{asset?.name}</div>
        <audio controls>
          <source src={asset?.animation_url} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </Suspense>
)

const GalleryView = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { contract, user } = useStore()
  const { sdk } = useInfuraSdk()

  const start = useCallback(async (address) => {
    const data = await sdk.getNFTs({
      publicAddress: address,
      includeMetadata: true
    })

    const items = data.assets.reduce((listNfts, nft) => {
      if (contract && contract.address) {
        if (nft.contractAddress.toLowerCase() === contract.address.toLowerCase()) {
          listNfts.push(nft.metadata)
          return listNfts
        }
        return [...listNfts]
      }
      return [...listNfts]
    }, [])

    setItems(items)
    setIsLoading(false)
  }, [sdk, contract])

  useEffect(() => {
    if (user && user.address) {
      start(user.address)
    } else {
      setItems([])
    }
  }, [start, user])

  return (<>
    {isLoading ? <div>Loading...</div> : items.length > 0 ?
      items.map((item, i) => (
        <Item
          data-grid-groupkey={i}
          key={i}
          num={i}
          asset={item}
        />)
      ) :
      (<div>No NFTs</div>)
    }
  </>)
}

export default GalleryView
