import React from "react";

import Anchor from "../atoms/Anchor";
import mmbrand from "../../assets/mm_brand.svg";

const learnMore = [
  {
    name: "GitHub",
    href: "",
  },
  {
    name: "Privacy Policy",
    href: "",
  },
  {
    name: "Terms of Service",
    href: "",
  },
];

const connect = [
  {
    name: "Contact",
    href: "",
  },
  {
    name: "Support",
    href: "",
  },
  {
    name: "Blog",
    href: "",
  },
  {
    name: "Twitter",
    href: "",
  },
];

const Footer = () => {
  return (
    <footer>
      <img src={mmbrand} alt="MetaMask" />
      <div>
        <h3>Need Help?</h3>
        <Anchor link="mailto:support@metamask.io" name="MetaMask Support">
          support@metamask.io
        </Anchor>
      </div>

      <div>
        <h3>Learn More</h3>
        {learnMore.map((link, idx) => (
          <Anchor link={link.href} key={`Learn More Link no. ${idx}`}>
            {link.name}
          </Anchor>
        ))}
      </div>
      <div>
        <h3>Connect</h3>
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
