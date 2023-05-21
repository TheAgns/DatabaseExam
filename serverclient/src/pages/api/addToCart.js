import neo4j from "neo4j-driver";
import { connect } from "../../lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { elementId } = req.body;

  let driver, neo4jSession;

  try {
    driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
    );
    neo4jSession = driver.session();

    const productResult = await neo4jSession.run(
      "MATCH (p) WHERE id(p) = $elementId RETURN p",
      { elementId }
    );
    console.log(productResult.elementId);

    if (productResult.records.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const product = productResult.records[0].get("p").properties;

    const { db } = await connect();
    const cartCollection = db.collection("cart");

    const existingCartItem = await cartCollection.findOne({
      _id: "646a0b2cde06068eacbda790",
    });

    if (existingCartItem) {
      // Hvis vores cart item allerede eksitere , så adder den produktet til products array'et
      // If the cart item already exists, add the product to its 'products' array
      await cartCollection.updateOne(
        { _id: "646a0b2cde06068eacbda790" },
        { $push: { products: { name: product.name, price: product.price } } }
      );
    } else {
      // hvis den cart item ikke findes, så laver den en ny med produktet
      const cartItem = {
        _id: "646a0b2cde06068eacbda790",
        products: [{ name: product.name, price: product.price }],
      };
      await cartCollection.insertOne(cartItem);
    }

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (neo4jSession) {
      await neo4jSession.close();
    }
    if (driver) {
      await driver.close();
    }
  }
}
