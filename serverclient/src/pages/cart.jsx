import Link from "next/link";
import { connect } from "../lib/mongodb";

function Cart({ items }) {
  if (!items) {
    return <p>Loading...</p>;
  }

  const itemIds = items.map((item) => item.item_id);
  const productIds = items.map((item) => item.product_id);

  return (
    <>
      <h1>MongoDB</h1>
      <ul>
        {itemIds.map((itemId, index) => (
          <li key={index}>{itemId}</li>
        ))}
      </ul>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}

export async function getServerSideProps({ query, params }) {
  try {
    const connection = await connect();
    const items = await connection
      .collection("item")
      .find()
      .project({ _id: 0 })
      .toArray();
    return {
      props: {
        items,
      },
    };
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    return {
      props: {
        items: null,
      },
    };
  }
}

export default Mongo;
