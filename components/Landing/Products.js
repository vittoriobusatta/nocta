import Link from "next/link";
import React, { useEffect, useState } from "react";

function Products() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata))
      .catch((error) => console.log(error));
  }, []);
  return (
    <section className="products">
      <div className="products__content">
        <div className="about__title">
          <h1>All Products</h1>
          <h5>{data.length}</h5>
        </div>
        <Link href="/products">View All</Link>
        <div className="products__list">
          {data.slice(0, 4).map((item) => {
            const { id, name, src } = item;

            return (
              <div className="products__item" key={id}>
                <div className="products__item__content">
                  <div
                    className="products__item__image"
                    style={{
                      backgroundImage: `url(/images/products/${src}.png)`,
                    }}
                  />
                </div>
                <div className="products__item__details">
                  <h3>{name}</h3>
                  <svg
                    width="21"
                    height="23"
                    viewBox="0 0 21 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
                      d="M10.5287 0V9.71831M21 11.5341H12.1268M10.5287 13.2817V23M8.87324 11.5341H0"
                      stroke="#767676"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Products;
