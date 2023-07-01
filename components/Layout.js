import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { AppContext } from "context";

function Layout({ children }) {
  const { headerColor } = useContext(AppContext);

  return (
    <>
      {/* <Loader /> */}
      <Header headerColor={headerColor} />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
