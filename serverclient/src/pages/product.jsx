import React from 'react';
import Link from 'next/link';
import { read } from '../lib/neo4j.js';

function AddToCartButton({ elementId }) {
  const addToCart = async () => {
    try {
      const response = await fetch('/api/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ elementId: elementId }),
      });

      if (response.ok) {
        console.log('Product added to cart!');
      } else {
        console.error('Failed to add product to cart.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={addToCart}>
      Add to Cart
    </button>
  );
}

function Neo4j({ products }) {
  const parsedProducts = JSON.parse(products);
              console.log(parsedProducts[5])
  //const prices = parsedProducts.map((product) => product.properties.price);
  //const name = parsedProducts.map((product) => product.properties.name);
  return (
    <>
      <h1>Neo4j</h1>
      <ul>
        {parsedProducts.map((product) => (
          <li key={product.identity.low}>
            {product.properties.price + ",-DKK"} - {product.properties.name}
            <AddToCartButton elementId={product.identity.low} />
          </li>
        ))}
      </ul>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}

export async function getServerSideProps({ query, params }) {
  const res = await read(`
    MATCH (p:Product)
    RETURN p
    limit 25
  `);

  const products = JSON.stringify(res.map((record) => record.p));
  return {
    props: {
      products,
    },
  };
}

export default Neo4j;
