import Head from 'next/head';
import {useRouter} from 'next/router';
import styles from '../../../../styles/Home.module.css';
import Link from 'next/link';
import { read } from '@/lib/neo4j';

export default function Reviews({reviews}){
    const parsedReviews = JSON.parse(reviews);
    console.log(parsedReviews)
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const {productId} = router.query
  
    return (
    <div className="container">
        <h2 className={styles.title}>
            Reviews of product with id: {productId} <span></span>
        </h2>
        <div className={styles.products_container}>
            {parsedReviews.map((review) => {
                return (
                <div className={styles.product_card} key={review.identity.low}>
                    <Link href={`./${review}`}>
                        <div className={styles.product_content}>
                            <h3>{review.properties.rating + "⭐️"}</h3>
                        </div>
                    </Link>
                    <p className={styles.para}>{review.properties.reviewText}</p>
                </div>
            );
       })}
       </div>
 </div>
    );
}
  
    export async function getServerSideProps( context ) {
    const {params} = context
    const {productId} = params
        const res = await read(`
          MATCH (n:Review)-[f:REVIEWS]-(p:Product)-[:OWNS]-(b:Brand) WHERE id(p) = ${productId} RETURN n
        `);
    const data = await JSON.stringify(res.map((record) => record.n));
    return {
      props: {
        reviews:data,
      },
    };
  }
