import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3ReactHooks } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useStore } from "src/state";
import { shortenAddress } from "src/utils";

function useBalances(
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[] | undefined
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts && accounts?.length) {
      let stale = false;

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

export function Accounts({
                           shorten = true
                         }: {
  shorten?: boolean,
  showBalance?: boolean
}) {
  const { user } = useStore();
  const { address, avatar, ens } = user;
  // const balances = useBalances(provider, account);
  const [accountDisplay, setAccountDisplay] = useState(address);


  useEffect(() => {
    if (shorten && address) {
      setAccountDisplay(shortenAddress(address));
    }
  }, [address, shorten]);

  if (address === undefined) return null;

  return (
    <div className={"w-full"}>
      {avatar && (
        <img src={avatar} alt="ENS Avatar" />
      )}
      {!address
        ? "None"
        :
        <div className={""}>
          {ens ? ens : accountDisplay}
          {/*{showBalance && balances?.[0] ? ` (Ξ${formatEther(balances[0])})` : null}*/}
        </div>
      }
    </div>
  );
}
