import Link from "next/link";
import { config } from "../lib/sql";
import mssql from "mssql";

function SQL({ products }) {
  const usernames = products.map((product) => product.name);

  return (
    <>
      <h1>SQL</h1>
      <ul>
        {usernames.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <h1 className="title">
 <Link href="./login">Login</Link>
          </h1>
    </>
  );
}

export async function getServerSideProps({ query, params }) {
  try {
    await mssql.connect(config);

    const request = new mssql.Request();
    const queryResult = await request.query("SELECT * FROM users");

    let products = [];
    if (queryResult && queryResult.recordset) {
      products = queryResult.recordset.map((row) => ({
        id: row.id,
        name: row.username,
        orderid: row.orderId
      }));
    }
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error connecting to MSSQL server:", error.message);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default SQL;
