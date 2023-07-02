import React from "react";
import data from "@/public/products.json";

function Product({ product }) {
  console.log(product);
  return (
    <div>
      <h1>{product[0].name}</h1>
    </div>
  );
}

export default Product;

export async function getStaticPaths() {
  const paths = data.map((item) => ({
    params: { path: item.src },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = data.filter((item) => item.src === params.path);

  return {
    props: {
      product,
    },
  };
}
