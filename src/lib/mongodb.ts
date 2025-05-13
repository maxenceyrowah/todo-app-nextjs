import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let connection: mongoose.Connection | null = null;

export async function connectDB() {
  if (connection) return connection;

  const mongoDBIntance = await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });
  connection = mongoDBIntance.connection;
  return connection;
}
