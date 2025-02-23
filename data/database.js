import mongoose from "mongoose";

async function connectDatabase() {
  await mongoose.connect("mongodb://localhost:27017/aroundb");
  console.log("Database conected!");
}

export { connectDatabase };
