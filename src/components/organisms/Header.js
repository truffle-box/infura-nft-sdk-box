import infurabrand from "../../assets/infura_brand.svg";
import NetworkConnector from "../web3/NetworkConnector";

const Header = () => {

  return (
    <header>
      <img src={infurabrand} alt="Infura" className={'w-12 ml-4'}/>
      <NetworkConnector>Connect with Wallet</NetworkConnector>
    </header>
  );
};

export default Header;
