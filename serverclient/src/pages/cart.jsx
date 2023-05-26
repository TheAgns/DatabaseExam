import Link from "next/link";
import { connect } from "../lib/mongodb";
import {useState} from 'react';
import styles from '../styles/components/Product.module.css';
import Head from 'next/head';

// function Cart({ items }) {
//   if (!items) {
//     return <p>Loading...</p>;
//   }

//   const itemIds = items.map((item) => item.item_id);
//   const productIds = items.map((item) => item.product_id);

//   return (
//     <>
//       <h1>MongoDB</h1>
//       <ul>
//         {itemIds.map((itemId, index) => (
//           <li key={index}>{itemId}</li>
//         ))}
//       </ul>
//       <h2>
//         <Link href="/">Back to home</Link>
//       </h2>
//     </>
//   );
// }

export default function Cart({cart, totalPrice}) {
  return (
    <div>
      <h1>CART</h1>
    {/* <title>CART</title> */}

      <div className={styles.products_container}>
      <p>{"Total price: " + totalPrice + "$"}<button className="btn">Buy now</button></p>
              {cart.map((product) => {
                 return (
                    <div className={styles.product_card} key={product}>
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

