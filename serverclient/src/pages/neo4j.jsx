import Link from "next/link";
import {read} from "../lib/neo4j.js"

function Neo4j({ products }) {
  const parsedProducts = JSON.parse(products);
  console.log(parsedProducts);
  const prices = parsedProducts.map((product) => product.properties.price);


  return (
    <>
      <h1>Neo4j</h1>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>{price}</li>
        ))}
      </ul>
      <h2>
        <Link href="/"> Back to home </Link>
      </h2>
    </>
  );
}

export async function getServerSideProps({ query, params }) {
  const res = await read(`
    MATCH (p:Product)
    RETURN p
  `);

  const products = JSON.stringify(res.map((record) => record.p));
  return {
    props: {
      products,
    },
  };
}

export default Neo4j;

