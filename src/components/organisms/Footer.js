import React from "react";

import Anchor from "../atoms/Anchor";
import mmbrand from "../../assets/mm_brand.svg";

const learnMore = [
  {
    name: "GitHub",
    href: "https://github.com/truffle-box/nft-api-box",
  },
  {
    name: "Privacy Policy",
    href: "https://consensys.net/privacy-policy/",
  },
  {
    name: "Terms of Service",
    href: "https://consensys.net/terms-of-use/",
  },
];

const connect = [
  {
    name: "Contact",
    href: "https://consensys.net/contact/",
  },
  {
    name: "Support",
    href: "https://trufflesuite.com/community/",
  },
  {
    name: "Blog",
    href: "https://trufflesuite.com/blog/",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/trufflesuite",
  },
];

const Footer = () => {
  return (
    <footer>
      <img src={mmbrand} alt="MetaMask" />
      <div>
        <h3 style={{fontWeight: '900'}}>Need Help?</h3>
        <Anchor link="mailto:support@metamask.io" name="MetaMask Support">
          support@metamask.io
        </Anchor>
      </div>

      <div>
        <h3 style={{fontWeight: '900'}}>Learn More</h3>
        {learnMore.map((link, idx) => (
          <Anchor link={link.href} key={`Learn More Link no. ${idx}`}>
            {link.name}
          </Anchor>
        ))}
      </div>
      <div>
        <h3 style={{fontWeight: '900'}}>Connect</h3>
        {connect.map((link, idx) => (
          <Anchor link={link.href} key={`Learn More Link no. ${idx}`}>
            {link.name}
          </Anchor>
        ))}
      </div>
      <p>
        &copy; {new Date().getFullYear()} MetaMask &#9679; A ConsenSys Formation
      </p>
    </footer>
  );
};

export default Footer;
