import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import AddContract from "./pages/AddContract";

const App = () => {
    return (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="/add-snap" element={<AddContract />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </HashRouter>
      );
};

export default App;
