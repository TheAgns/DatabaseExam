import Head from 'next/head';
import {useRouter} from 'next/router';
import { read } from '@/lib/neo4j';
import styles from '../../../styles/components/Product.module.css';
import Link from 'next/link';

export default function Product({product, recommendations}){
    const parsedProduct = JSON.parse(product);
    const parsedRecommendations = JSON.parse(recommendations);
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const {productId} = router.query
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
        <Link href={`./${productId}/reviews`}parseHref style={{ textDecoration: '', color: 'blue', fontSize: 20 }}>
          <h4>Reviews</h4>
        </Link>
      </div>
      <div className={styles.products_container}>
      <h2>Recommended products</h2>
              {parsedRecommendations.map((recommendation) => {
                 return (
                    <div className={styles.product_card} key={recommendation.identity.low}>
                       <Link href={`./${recommendation.identity.low}`}>
                       <div className={styles.product_content}>
                          <h3 style={{color: 'black'}}>{recommendation.properties.name}</h3>
                          <h3></h3>
                        </div>
                       </Link>
                       <p className={styles.para}>${recommendation.properties.price}</p>
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
    const res1 = await read(`
    MATCH (p: Product)
WHERE ID(p) = ${productId}
RETURN p
  `);
  const product = JSON.stringify(res1.map((record) => record.p));
  const res2 = await read(`CALL gds.alpha.nodeSimilarity.filtered.stream('nuna', { 
    sourceNodeFilter: ${productId}
   })
   YIELD node1, node2, similarity
   RETURN gds.util.asNode(node2) AS Product2, 
   similarity
   ORDER BY similarity DESCENDING, Product2 LIMIT 4`)

   const recommendations = JSON.stringify(res2.map((record) => record.Product2));
    
    return {
        props: {
            product: product,
            recommendations: recommendations
        }
    }
}