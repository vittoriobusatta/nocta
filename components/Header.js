import { AppContext } from "context";
import Link from "next/link";
import React, { useContext } from "react";
import { Logo } from "utils/icons";

function Header({ headerRef }) {
  const { headerColor } = useContext(AppContext);
  return (
    <header className="header" ref={headerRef}>
      <Link href="/">
        <Logo className="header__logo" 
          color={headerColor}
        />
      </Link>
      <p>menu</p>
      {/* <svg
        width="35"
        height="38"
        viewBox="0 0 35 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5478 0.242188V15.8397M35 18.7539H20.2113M17.5478 21.5588V37.1562M14.7887 18.7539H0"
          stroke="#000"
          strokeWidth="3"
        />
      </svg> */}
    </header>
  );
}

export default Header;
