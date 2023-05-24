import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import AddToCartButton from '../components/AddToCartButton'
import { read } from '../lib/neo4j';

export default function Home({ products }) {
  const parsedProducts = JSON.parse(products);
  return (
     <>
        <Head>
           <title>Products | Home</title>
        </Head>
        <div className="container">
           <h2 className={styles.title}>
              All Products <span></span>
           </h2>
           <h1 className="title">
 <Link href="./getUsers">GET INFO</Link>
          </h1>
           <div className={styles.products_container}>
              {parsedProducts.map((product) => {
                 return (
                    <div className={styles.product_card} key={product.identity.low}>
                       <Link href={`products/${product.identity.low}`}>
                       <div className={styles.product_content}>
                          <h3>{product.properties.name}</h3>
                          <h3></h3>
                        </div>
                       </Link>
                       <p className={styles.para}>${product.properties.price}</p>
                       <AddToCartButton elementId={product.identity.low}>Add to cart 🛒</AddToCartButton>
                    </div>
                 );
              })}
           </div>
        </div>
     </>
  );
 }

 export async function getServerSideProps({ query, params }) {
  const res = await read(`
    MATCH (p:Product)
    RETURN p
    limit 25
  `);

  const products = await JSON.stringify(res.map((record) => record.p));
  return {
    props: {
      products,
    },
  };
}