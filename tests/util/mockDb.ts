import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = MongoMemoryServer.create();

export const connect = async () => {
  try {
    const uri = (await mongod).getUri();
    await mongoose.connect(uri);
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
  }
};

export const closeDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (await mongod).stop();
  } catch (error) {
    console.log(`Error closing the database: ${error}`);
  }
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  try {
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch (error) {
    console.log(`Error clearing the database: ${error}`);
  }
};
