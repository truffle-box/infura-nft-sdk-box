import { hooks } from 'components/web3/connectors/metaMask'
import { NFTResponseObject } from 'global'
import { useInfuraSdk } from 'hooks/useInfuraSdk'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { useStore } from 'state'
import './index.css'

const { useAccount } = hooks

const Item = ({ asset }: { asset?: any }) => (
  <Suspense fallback={<PuffLoader loading={true} />}>
    {!asset && <div className="item">No Metadata found for item.</div>}
    {asset && <div className="item">
      <div className="thumbnail">
        <img src={asset?.image} alt="" />
      </div>
      <div className="info">
        <div className="title">{asset?.name}</div>
        <audio controls>
          <source src={asset?.animation_url} type="audio/mpeg" />
        </audio>
      </div>
    </div>}
  </Suspense>
)

const GalleryView = () => {
  const [items, setItems] = useState<Array<NFTResponseObject>>([])
  const [isLoading, setIsLoading] = useState(true)
  const userAccount = useAccount()
  const { contract } = useStore()
  const sdk = useInfuraSdk()

  const start = useCallback(async (publicAddress: string) => {
    if (!sdk) return

    const data = await sdk.getNFTs({
      publicAddress,
      includeMetadata: true
    })

    const items = data.assets.reduce((listNfts, nft) => {
      /*
       {
       "pageNumber": 1,
       "network": "RINKEBY",
       "total": 1,
       "account": "0x37aD88b4bdAE06Dd10b64eE86a1c1b81202C0028",
       "type": "NFT",
       "assets": [
       {
       "contract": "0x55210badb0301f4b353d6b947284d8eb7287d6cb",
       "tokenId": "0",
       "supply": "1",
       "type": "ERC721",
       "metadata": null
       }
       ]
       }

       */
      console.log(`NFT: `, { listNfts, nft })
      if (contract && contract.address) {
        if (nft.contract.toLowerCase() === contract.address.toLowerCase()) {
          listNfts.push(nft.metadata)
          return listNfts
        }
        return [...listNfts]
      }
      return [...listNfts]
    }, new Array<NFTResponseObject>())
    setItems(items)
    setIsLoading(false)
  }, [sdk, contract])

  useEffect(() => {
    if (userAccount) {
      start(userAccount)
    } else {
      setItems([])
    }
  }, [sdk, contract, start, userAccount])

  return (<>
    {isLoading ? <div>Loading...</div> : items.length > 0 ?
      items.map((item, i) => (
        <Item
          data-grid-groupkey={i}
          key={i}
          asset={item}
        />)
      ) :
      (<div>No NFTs</div>)
    }
  </>)
}

export default GalleryView
