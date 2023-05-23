import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import AddToCartButton from '../components/AddToCartButton'
import { read } from '@/lib/neo4j';

export default function Home({ products }) {
  return (
     <>
        <Head>
           <title>Products | Home</title>
        </Head>
        <div className="container">
           <h2 className={styles.title}>
              All Products <span></span>
           </h2>
           <div className={styles.products_container}>
              {products.map((product) => {
                 return (
                    <div className={styles.product_card} key={product.id}>
                       <Link href={`products/${product.id}`}>
                       <div className={styles.product_content}>
                          <h3>{product.name}</h3>
                        </div>
                       </Link>
                       <p className={styles.para}>${product.price}</p>
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

  const products = JSON.stringify(res.map((record) => record.p));
  return {
    props: {
      products,
    },
  };
}