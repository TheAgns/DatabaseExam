import Head from 'next/head';
import {useRouter} from 'next/router';
import { read } from '@/lib/neo4j';
import styles from '../../../styles/components/Product.module.css';
import Link from 'next/link';

export default function Product({product}){
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
       <div className={styles.single_container}>
          <Head>
             <title>{product.name}</title>
          </Head>          
            <div className={styles.right_section}>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <button className='btn'> Add to cart 🛒</button>
                <Link href="/" style={{textDecoration: '', color: 'blue', fontSize: 20}}>
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
    MATCH (p:Product{id:${productId}})
    RETURN p
  `);
    const data = await response.json()
  
    return {
        props: {
            product: data
        }
    }
}