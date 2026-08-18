// config/db.js
// Handles the connection between our Express app and MongoDB using Mongoose.

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Exit the process with failure — no point running a server that can't reach the database
    process.exit(1);
  }
};

export default connectDB;