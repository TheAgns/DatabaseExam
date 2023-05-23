import Head from 'next/head';
import {useRouter} from 'next/router';
import { read } from '@/lib/neo4j';
import styles from '../../../styles/components/Product.module.css';
import Link from 'next/link';

export default function Product({product}){
    const parsedProduct = JSON.parse(product);
    console.log(parsedProduct)
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const { name, price } = parsedProduct[0].properties;

  return (
    <div className={styles.single_container}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.right_section}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.price}>${price}</p>
        <button className='btn'>Add to cart 🛒</button>
        <Link href="/" style={{ textDecoration: '', color: 'blue', fontSize: 20 }}>
          <h4>Reviews</h4>
        </Link>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
    const {params} = context
    const {productId} = params
    const res = await read(`
    MATCH (p: Product)
WHERE ID(p) = ${productId}
RETURN p
  `);

  //const product = res[0]


    const data = JSON.stringify(res.map((record) => record.p));
    return {
        props: {
            product: data
        }
    }
}