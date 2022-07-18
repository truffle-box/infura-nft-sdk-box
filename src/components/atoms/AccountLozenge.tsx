import Avvvatars from 'avvvatars-react'
import { shortenAddress } from 'src/utils'

const AccountLozenge = ({address, ensName, avatar}: {
  address: string | undefined,
  ensName: string | undefined,
  avatar: string | undefined
}) => {

  return (
    <div className={'flex flex-row bg-gray-800 rounded-full p-2 justify-left items-center gap-4'}>
      <div className={'h-[30px] rounded-full'}>
        {avatar ? (
          <img src={avatar} alt="ENS Avatar" width={30} />
        ) :  address ? (
          <Avvvatars value={address} style="shape" size={30} />
        ): ('')}
      </div>
      {address &&
        <div className={'text-white'}>{ensName || shortenAddress(address)}</div>
      }
    </div>
  )
}

export default AccountLozenge
