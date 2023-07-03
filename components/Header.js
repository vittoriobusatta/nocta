import { AppContext } from "context";
import Link from "next/link";
import React, { useContext } from "react";
import { Logo } from "utils/icons";

function Header() {
  const { headerColor, setMenuIsOpen, setHeaderColor } = useContext(AppContext);

  const handleMenu = () => {
    setMenuIsOpen((prev) => !prev);
    setHeaderColor("black");
  };

  return (
    <>
      <Link href="/" className="header__logo">
        <Logo className="" color={headerColor} />
      </Link>
      <div
        className={`header__btn ${
          headerColor === "white" ? "header__btn--white" : ""
        }`}
        onClick={handleMenu}
      >
        <span>menu</span>
      </div>
    </>
  );
}

export default Header;
