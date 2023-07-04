import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const imagesRef = useRef([]);

  const itemsClicks = (index) => {
    setCurrentItem(index);
    setMenuIsOpen(false);
  };

  const animateMenu = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: "power3.inOut",
      },
    });

    if (menuIsOpen) {
      console.log("open");
      tl
        .to(menuRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        })
        .fromTo(
          itemsRef.current,
          {
            yPercent: 100,
          },
          {
            yPercent: 0,
            stagger: 0.1,
          }
        )
        .fromTo(
          imagesRef.current,
          {
            height: 0,
          },
          {
            height: "auto",
            stagger: 0.1,
          }
        ),
        "-=0.8";
    } else {
      tl.to(menuRef.current, {
        clipPath: "polygon(0 0, 0% 0, 0% 100%, 0% 100%)",
      });
    }
  };

  useEffect(() => {
    animateMenu();
  }, [menuIsOpen]);

  return (
    <section className={`menu`} ref={menuRef}>
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
                onClick={() => itemsClicks(index)}
              >
                <div className="menu__item__row">
                  <Link
                    href={link}
                    ref={(el) => (itemsRef.current[index] = el)}
                  >
                    <h1 className="menu__item__link">{name}</h1>
                  </Link>
                  <Image
                    src={src}
                    alt={`Menu image ${index + 1}`}
                    width={imageHW}
                    height={imageHW}
                    className="menu__item__img"
                    ref={(el) => (imagesRef.current[index] = el)}
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
