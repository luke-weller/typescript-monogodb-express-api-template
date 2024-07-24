import app from "../../../src/app";
import {
  connectDatabase,
  closeDatabase,
  clearDatabase,
} from "../../setup/mockDb";
import supertest from "supertest";

const request = supertest(app);
const apiUrl = "/api/example";

describe("GET example by ID from the database /examples", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should get an example by ID and return a 200 status code", async () => {
    // ARRANGE:
    const example = {
      name: "example1",
      description: "description1",
    };

    const resPost = await request.post(apiUrl).send(example);

    // ACT:
    const resGet = await request.get(`${apiUrl}/${resPost.body._id}`);

    // ASSERT
    expect(resGet.statusCode).toBe(200);
    expect(resGet.body).toHaveProperty("name", example.name);
    expect(resGet.body).toHaveProperty("description", example.description);
    expect(resGet.body).toHaveProperty("createdAt");
  });

  test("should return a 404 status code if example is not found", async () => {
    // ARRANGE:
    const badExampleId = "5f5b8f0b4f2b9b1d4c8f79d2";

    // ACT:
    const resGet = await request.get(`${apiUrl}/${badExampleId}`);

    // ASSERT
    expect(resGet.statusCode).toBe(404);
    expect(resGet.text).toBe("Example not found");
  });

  test("should return a 400 status code if ID is not valid format", async () => {
    // ARRANGE:
    const badExampleId = "hello world";

    // ACT:
    const resGet = await request.get(`${apiUrl}/${badExampleId}`);

    // ASSERT
    expect(resGet.statusCode).toBe(400);
    expect(resGet.text).toBe("Invalid ID format");
  });
});
