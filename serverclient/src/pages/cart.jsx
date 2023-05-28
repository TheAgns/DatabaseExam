import Link from "next/link";
import { connect } from "../lib/mongodb";
import styles from '../styles/components/Product.module.css';
import OrderNowButton from '../components/OrderNowButton'

export default function Cart({cart, totalPrice}) {
  //console.log(cart)
  return (
    <div>
      
      <h1>CART</h1>
    {/* <title>CART</title> */}

      <div className={styles.products_container}>
      <p>{"Total price: " + totalPrice + "$"}</p>
      
<OrderNowButton cart={cart} totalPrice={totalPrice}></OrderNowButton>

              {cart.map((product) => {
              
                 return (
                    <div className={styles.product_card} key={product.id}>

                       <div className={styles.product_content}>
                          <h3>{product.name}</h3>
                           <p className={styles.para}>${product.price}</p>
                        </div>
                    </div>
                 );
                 
              })}
           </div>
    </div>
  )
}

export async function getServerSideProps({ query, params }) {
  const { db } = await connect();
  const cartCollection = db.collection("cart");

  const totalPriceRes = await cartCollection.aggregate([
    { $unwind: "$products" },
    {
      $group: {
        _id: "646a0b2cde06068eacbda790",
        totalPrice: { $sum: "$products.price" }
      }
    }
  ]).toArray();

  const cartItem = await cartCollection.findOne({
    _id: "646a0b2cde06068eacbda790",
  });

  const { products } = cartItem;
  const totalPrice = totalPriceRes.length > 0 ? totalPriceRes[0].totalPrice : null;

  return {
    props: {
      cart: products,
      totalPrice: totalPrice
    }
  };
}