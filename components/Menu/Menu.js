import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const images = [];

for (let i = 1; i <= 4; i++) {
  images.push(require(`@/public/images/menu/m_0${i}.jpg`));
}

const menuNames = ["Shop All", "Campaign", "About us", "Cart"];
const menuLinks = ["/products", "/", "/", "/"];

const menuItems = menuNames.map((name, index) => {
  return {
    id: index + 1,
    name,
    src: images[index],
    link: menuLinks[index],
  };
});

function Menu({ menuIsOpen, setMenuIsOpen }) {
  const [currentItem, setCurrentItem] = useState(0);

  const handleMenu = (index) => {
    setCurrentItem(index);
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <section className={`menu ${menuIsOpen ? "menu--open" : ""}`}>
      <div className="menu__container">
        <ul className="menu__list">
          {menuItems.map((item, index) => {
            const isActive = currentItem === index;
            const { src, name, id, link } = item;
            const imageHW = 150;
            return (
              <li
                className={`menu__item ${isActive ? "menu__item--active" : ""}`}
                key={id}
                onClick={() => handleMenu(index)}
              >
                <div className="menu__item__row">
                  <Link href={link}>
                    <h1 className="menu__item__link">{name}</h1>
                  </Link>
                  <Image
                    src={src}
                    alt={`Menu image ${index + 1}`}
                    width={imageHW}
                    height={imageHW}
                    className="menu__item__img"
                  />
                </div>
              </li>
            );
          })}
          <p>A collection for the collective</p>
        </ul>
      </div>
    </section>
  );
}

export default Menu;
