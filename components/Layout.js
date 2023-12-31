import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { AppContext } from "context";
import Menu from "./Menu/Menu";
import Cursor from "./Cursor";

function Layout({ children }) {
  const { menuIsOpen, setMenuIsOpen } = useContext(AppContext);
  return (
    <>
      <Loader />
      <Cursor />
      <Header />
      <main>{children}</main>
      <Menu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Footer />
    </>
  );
}

export default Layout;
