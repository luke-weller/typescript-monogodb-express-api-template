import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Type assertion to treat error as an object with a message property
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export { connectDB };
