import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Arrow, Viewfinder } from "utils/icons";

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
        <div className="products__head">
          <div
            className="products__head__title"
            data-title-length={data.length}
          >
            <h1>All Products</h1>
          </div>
          <Link href="/products" className="products__head__link">
            <p>View All</p>
            <Arrow />
          </Link>
        </div>
        <div className="products__list">
          {data.slice(0, 4).map((item) => {
            const { id, name, src } = item;
            return (
              <div className="products__item" key={id}>
                <Link href={`/products/${src}`}>
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
                    <Viewfinder />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Products;
