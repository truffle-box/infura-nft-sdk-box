import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import AddContract from "./pages/AddContract";
import LoadContract from './pages/LoadContract';

const App = () => {
    return (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="/add-contract" element={<AddContract />} />
              <Route path="/load-contract" element={<LoadContract />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </HashRouter>
      );
};

export default App;
