import { connect } from "../../lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { elementId } = req.query;

  try {
    const { db } = await connect();
    const cartCollection = db.collection("cart");

    const cartItem = await cartCollection.findOne({
      _id: "646a0b2cde06068eacbda790",
    });

    if (!cartItem) {
      res.status(404).json({ message: "Cart item not found" });
      return;
    }

    const products = cartItem.products;

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
