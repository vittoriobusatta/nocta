import { AppContext } from "context";
import Link from "next/link";
import React, { useContext } from "react";
import { Logo } from "utils/icons";
import Menu from "./Menu/Menu";

function Header() {
  const { headerColor, menuIsOpen, setMenuIsOpen, setHeaderColor } =
    useContext(AppContext);

  const handleMenu = () => {
    setMenuIsOpen((prev) => !prev);
    setHeaderColor("black");
  };

  return (
    <>
      <Link href="/" className="header__logo">
        <Logo className="" color={headerColor} />
      </Link>
      <div className="header__btn" onClick={handleMenu}>
        <span>menu</span>
      </div>
      {menuIsOpen && <Menu />}
    </>
  );
}

export default Header;
