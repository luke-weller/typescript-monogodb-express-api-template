import { ExampleModel } from "../../src/models/exampleModel";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("ExampleModel", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
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
