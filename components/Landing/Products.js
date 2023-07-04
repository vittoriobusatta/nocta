import { gsap } from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Arrow, Viewfinder } from "utils/icons";

function Products() {
  const [data, setData] = useState([]);
  const productsRef = useRef(null);
  const titleref = useRef(null);
  const linkRef = useRef(null);
  const items = useRef([]);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata))
      .catch((error) => console.log(error));
  }, []);

  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  });

  useEffect(() => {
    tl.set(titleref.current, { yPercent: 100 });
    tl.set(linkRef.current, { yPercent: 100 });
    tl.set(items.current, {
      scale: 0.95,
    });

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const section = productsRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tl.addLabel("start");
          tl.to(
            titleref.current,
            {
              yPercent: 0,
            },
            "start"
          );
          tl.to(
            linkRef.current,
            {
              yPercent: 0,
              delay: 0.2,
            },
            "start"
          );
          tl.to(
            items.current,
            {
              scale: 1,
              stagger: 0.05,
              delay: 0.2,
            },
            "-=0.4"
          );
        }
      });
    }, options);

    observer.observe(section);

    return () => {
      observer.unobserve(section);
      observer.disconnect();
    };
  }, [tl]);

  return (
    <section className="products" ref={productsRef}>
      <div className="products__content">
        <div className="products__head">
          <div
            className="products__head__title hidden"
            data-title-length={data.length}
          >
            <h1 ref={titleref}>All Products</h1>
          </div>
          <div className="products__head__link hidden">
            <Link href="/products" ref={linkRef}>
              View All
            </Link>
            {/* <Arrow /> */}
          </div>
        </div>
        <div className="products__list">
          {data.slice(0, 4).map((item) => {
            const { id, name, src } = item;
            return (
              <div className="products__item" key={id}>
                {/* <Link href={`/products/${src}`}> */}
                <div className="products__item__content">
                  <div
                    className="products__item__image"
                    style={{
                      backgroundImage: `url(/images/products/${src}.png)`,
                    }}
                    ref={(el) => (items.current[id] = el)}
                  />
                </div>
                <div className="products__item__details">
                  <h3>{name}</h3>
                  <Viewfinder />
                </div>
                {/* </Link> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Products;
