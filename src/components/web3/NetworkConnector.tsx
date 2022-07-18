import { useEffect, useState } from "react";
import { Chain } from "src/components/atoms/Chain";
import { hooks, metaMask } from "./connectors/metaMask";
import { ConnectWithSelect } from "./ConnectWithSelect";
import { Status } from "src/components/atoms/Status";

const { useChainId, useAccount, useIsActivating, useIsActive, useProvider, useENSName } = hooks;


const NetworkConnector = () => {

  const chainId = useChainId();
  const account = useAccount();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSName = useENSName(provider);
  const [error, setError] = useState<Error | undefined>(undefined);

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);


  return (
    <>
      <div className={"flex flex-row border w-4/5 items-center align-middle justify-end gap-4"}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
        <Chain chainId={chainId} />
        <ConnectWithSelect
          connector={metaMask}
          chainId={chainId}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
          setError={setError}
          account={account}
          provider={provider}
          ENSName={ENSName}
        />
      </div>
    </>
  );
};

export default NetworkConnector;
