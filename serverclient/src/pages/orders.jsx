import Link from "next/link";
import { getOrders } from "../lib/sql";
import styles from '../styles/components/Product.module.css';
export default function Orders({orders}) {
  const parsedOrders = JSON.parse(orders);
  console.log(parsedOrders)
  const ordersArray = parsedOrders[0];


  return (
    <>
      <h1>Orders</h1>
      <div className={styles.products_container}>
              {ordersArray.map((order) => {
                 return (
                    <div className={styles.product_card} key={order.id}>
                       <div className={styles.product_content}>
                       <p className={styles.para}>User id: {order.userId}</p>
                       <p className={styles.para}>Total amount: {order.total + "$"}</p>
                       <p className={styles.para}>Address: {order.billingAddress}</p>
                       <p className={styles.para}>City: {order.billingCity}</p>
                       <p className={styles.para}>Postal code: {order.postalCode}</p>
                      </div>
                      <br></br>
                     </div>
                 );
              })}
           </div>
      <h2>
        <Link href="/"> Back to home </Link>
      </h2>
    </>
  );
}

export async function getServerSideProps({ query, params }) {
const res = await getOrders();
//console.log(res)
  const orders = JSON.stringify(res.map((record) => record));
  return {
    props: {
      orders: orders,
    },
  };
}


