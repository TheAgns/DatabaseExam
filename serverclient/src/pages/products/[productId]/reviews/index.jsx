import Head from 'next/head';
import {useRouter} from 'next/router';
import styles from '../../../../styles/Home.module.css';
import Link from 'next/link';

export default function Reviews({reviews}){
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
            {reviews.map((review) => {
                return (
                <div className={styles.product_card} key={review.id}>
                    <Link href={`./${review.id}`}>
                        <div className={styles.product_content}>
                            <h3>{review.id}</h3>
                        </div>
                    </Link>
                    <p className={styles.para}>${review.rating}</p>
                </div>
            );
       })}
       </div>
 </div>
    );
}

export async function getServerSideProps(context) {
    const {params} = context
    const {productId} = params
    const response = await fetch(`http://localhost:4000/products/${productId}/reviews/}`)
    const data = await response.json()
  
    return {
        props: {
            reviews: data
        }
    }
}