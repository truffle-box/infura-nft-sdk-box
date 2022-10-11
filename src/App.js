import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import Gallery from "./pages/Gallery";
import "./App.css";
import AddContract from "./pages/AddContract";
import LoadContract from "./pages/LoadContract";
import Contract from "./pages/Contract";
import NoMatch from "./pages/NoMatch";
import 'react-toastify/dist/ReactToastify.min.css';
import NftDetails from "./pages/NftDetails";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/add-contract" element={<AddContract />} />
          <Route path="/load-contract" element={<LoadContract />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/nft/:id" element={<NftDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
