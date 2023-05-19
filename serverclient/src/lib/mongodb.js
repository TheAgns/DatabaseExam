import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/your_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB database");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    throw error;
  }
}
