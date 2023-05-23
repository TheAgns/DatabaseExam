import Head from 'next/head';
import {useRouter} from 'next/router';
import styles from '../../../styles/Home.module.css';
import Link from 'next/link';

export default function Review({review}){
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const {productId, reviewId} = router.query

    return (
       <>
          <Head>
             <title>Review {reviewId} of product {productId}</title>
          </Head>
          <div className={styles.single_container}>
             <div className={styles.right_section}>
                <h3 className={styles.title}>{review.rating}</h3>
                <p className={styles.price}>{review.text}</p>
             </div>
          </div>
       </>
    );
}

export async function getServerSideProps(context) {
    //Fetch the specific review of the product
    const {params} = context
    const {productId, reviewId} = params
    const response = await fetch(`http://localhost:4000/products/${productId}/reviews/${reviewId}`)
    const data = await response.json()
  
    return {
        props: {
            review: data
        }
    }
}