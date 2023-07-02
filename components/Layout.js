import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";

function Layout({ children, headerRef }) {

  return (
    <>
      <Loader />
      <Header headerRef={headerRef} />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
