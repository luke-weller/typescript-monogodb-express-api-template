import { ExampleModel } from "../../src/models/exampleModel";
import mongoose from "mongoose";
import { connectDB, closeDatabase } from "../config/mockDatabase";

describe("ExampleModel", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await ExampleModel.createCollection();
  });

  afterEach(async () => {
    await mongoose.connection.dropCollection("examplemodels");
  });

  it("should create a new example model", async () => {
    const exampleData = {
      name: "Test",
      description: "This is a test",
      createdAt: new Date(),
    };
    const example = await ExampleModel.create(exampleData);

    expect(example.name).toBe(exampleData.name);
    expect(example.description).toBe(exampleData.description);
  });

  it("should find an example model by name", async () => {
    const exampleData = {
      name: "FindTest",
      description: "Find this test",
      createdAt: new Date(),
    };
    await ExampleModel.create(exampleData);

    const foundExample = await ExampleModel.findOne({ name: "FindTest" });
    expect(foundExample).not.toBeNull();
    expect(foundExample?.name).toBe(exampleData.name);
    expect(foundExample?.description).toBe(exampleData.description);
  });
});
