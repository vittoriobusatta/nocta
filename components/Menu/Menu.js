import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { menuAnimation } from "utils/animations";

const images = [];
const imagesHovered = [];

for (let i = 1; i <= 4; i++) {
  images.push(require(`@/public/images/menu/m_0${i}.jpg`));
  imagesHovered.push(require(`@/public/images/menu/m_0${i}_hovered.jpg`));
}

const menuNames = ["Shop All", "Campaign", "About us", "Cart"];
const menuLinks = ["/products", "/", "/", "/"];

const menuItems = menuNames.map((name, index) => ({
  id: index + 1,
  name,
  src: images[index],
  link: menuLinks[index],
  srcHovered: imagesHovered[index],
}));

function Menu({ menuIsOpen, setMenuIsOpen }) {
  const [currentItem, setCurrentItem] = useState(0);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const imagesRef = useRef([]);
  const quoteRef = useRef(null);

  const itemsClicks = (index) => {
    setCurrentItem(index);
    setMenuIsOpen(false);
  };

  useEffect(() => {
    const tl = menuAnimation({
      menuIsOpen,
      menuRef,
      itemsRef,
      imagesRef,
      quoteRef,
    });
    return () => tl.kill();
  }, [menuIsOpen]);

  return (
    <section className={`menu`} ref={menuRef}>
      <div className="menu__container">
        <ul className="menu__list">
          {menuItems.map((item, index) => {
            const isActive = currentItem === index;
            const { src, name, id, link, srcHovered } = item;
            const imageHW = 150;
            const imgHov = srcHovered.default.src;

            return (
              <li
                className={`menu__item ${isActive ? "menu__item--active" : ""}`}
                key={id}
                onClick={() => itemsClicks(index)}
              >
                <div className="menu__item__row">
                  <Link
                    href={link}
                    ref={(el) => (itemsRef.current[index] = el)}
                  >
                    <h1 className="menu__item__link">{name}</h1>
                  </Link>
                  <div
                    className="menu__item__image"
                    style={{
                      "--image": `url(${imgHov})`,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Menu image ${index + 1}`}
                      width={imageHW}
                      height={imageHW}
                      className="menu__item__img"
                      ref={(el) => (imagesRef.current[index] = el)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <div className="menu__quote">
            <p ref={quoteRef}>A collection for the collective</p>
          </div>
        </ul>
      </div>
    </section>
  );
}

export default Menu;
