import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Web3ReactProvider } from "@web3-react/core";
import { hooks as metaMaskHooks, metaMask } from "./components/web3/connectors/metaMask";
import { EthProvider } from './ethereum'

const connectors = [
  [metaMask, metaMaskHooks]
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3ReactProvider connectors={connectors}>
    <EthProvider>
      <App />
    </EthProvider>
  </Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
