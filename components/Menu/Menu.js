import Image from "next/image";
import React, { useState } from "react";

const images = [];

for (let i = 1; i <= 4; i++) {
  images.push(require(`@/public/images/menu/m_0${i}.jpg`));
}

const menuItems = [
  {
    id: 1,
    name: "Shop All",
    src: images[0],
  },
  {
    id: 2,
    name: "Campaign",
    src: images[1],
  },
  {
    id: 3,
    name: "Next Drop",
    src: images[2],
  },
  {
    id: 4,
    name: "Cart",
    src: images[3],
  },
];

function Menu() {
  const [currentItem, setCurrentItem] = useState(0);

  return (
    <section className="menu">
      <div className="menu__container">
        <ul className="menu__list">
          {menuItems.map((item, index) => {
            const isActive = currentItem === index;
            const { src, name, id } = item;
            const imageHW = 150
            return (
              <li
                className={`menu__item ${isActive ? "menu__item--active" : ""}`}
                key={id}
                onClick={() => setCurrentItem(index)}
              >
                <div className="menu__item__row">
                  <h1 className="menu__item__link">{name}</h1>
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
