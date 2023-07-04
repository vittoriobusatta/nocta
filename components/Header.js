import { AppContext } from "context";
import Link from "next/link";
import React, { useContext } from "react";
import { Logo } from "utils/icons";

function Header() {
  const { headerColor, menuIsOpen, setMenuIsOpen, setHeaderColor } =
    useContext(AppContext);

  const handleMenu = () => {
    setMenuIsOpen((prev) => !prev);
    setHeaderColor("black");
  };

  const isActive = menuIsOpen ? "header__btn__button--active" : "";

  return (
    <>
      <Link
        href="/"
        className="header__logo"
        onClick={() => setMenuIsOpen(false)}
      >
        <Logo className="" color={headerColor} />
      </Link>
      <div
        className={`header__btn ${
          headerColor === "black" ? "header__btn--black" : ""
        }`}
        onClick={handleMenu}
      >
        <button className={`header__btn__button ${isActive}`}>
          {[...Array(4)].map((_, index) => (
            <span
              className={`header__btn__line header__btn__line--${index + 1}`}
              key={index}
            />
          ))}
        </button>
      </div>
    </>
  );
}

export default Header;
