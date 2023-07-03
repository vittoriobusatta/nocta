import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { AppContext } from "context";
import Menu from "./Menu/Menu";

function Layout({ children }) {
  const { menuIsOpen } = useContext(AppContext);
  return (
    <>
      {/* <Loader /> */}
      <Header />
      <main>{children}</main>
      <Menu menuIsOpen={menuIsOpen} />
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
