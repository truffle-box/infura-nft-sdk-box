import Avvvatars from "avvvatars-react";
import { useStore } from "src/state";
import { shortenAddress } from "src/utils";

const AccountLozenge = () => {
  const { user } = useStore();
  const { address, avatar, ens } = user;

  return (
    <div className={'flex flex-row bg-gray-800 rounded-full p-2 justify-left items-center gap-4'}>
      <div className={'h-[30px] rounded-full'}>
        {avatar ? (
          <img src={avatar} alt="ENS Avatar" width={30} />
        ) : (
          <Avvvatars value={address} style="shape" size={30} />
        )}
      </div>
      <div className={'text-white'}>{ens || shortenAddress(address)}</div>
    </div>
  );
};

export default AccountLozenge;
