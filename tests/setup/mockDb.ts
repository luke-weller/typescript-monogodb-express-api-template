import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ExampleModel } from "../../src/models/exampleModel";

const mongod = MongoMemoryServer.create();

export const connectDatabase = async () => {
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

export const seedDatabase = async () => {
  try {
    const examples = [
      { name: "Example 1", description: "This is example 1" },
      { name: "Example 2", description: "This is example 2" },
      { name: "Example 3", description: "This is example 3" },
      { name: "Example 3", description: "This is example 3" },
      { name: "Example 3", description: "This is example 3" },
      { name: "Example 3", description: "This is example 3" },
    ];

    await ExampleModel.insertMany(examples);
  } catch (error) {
    console.log(`Error seeding the database: ${error}`);
  }
};
