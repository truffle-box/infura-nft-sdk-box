import GlobalStyles from "../theme/GlobalStyles";

import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import Nav from "../components/organisms/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
