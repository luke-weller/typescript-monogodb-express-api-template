import app from "../../../src/app";
import {
  connectDatabase,
  closeDatabase,
  clearDatabase,
} from "../../setup/mockDb";
import supertest from "supertest";

const request = supertest(app);
const apiUrl = "/api/example";

describe("POST /examples", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should post a valid example to the database and return a 200 status code", async () => {
    // ARRANGE:
    const example = {
      name: "example1",
      description: "description1",
    };

    // ACT:
    const res = await request.post(apiUrl).send(example);

    // ASSERT
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", example.name);
    expect(res.body).toHaveProperty("description", example.description);
    expect(res.body).toHaveProperty("createdAt");
  });

  test("should return a 400 status code when posting an example with an empty name", async () => {
    // ARRANGE:
    const example = {
      name: "",
      description: "description1",
    };

    // ACT:
    const res = await request.post(apiUrl).send(example);

    // ASSERT
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Example name is required.");
  });

  test("should return a 400 status code when posting an example with an empty description", async () => {
    // ARRANGE:
    const example = {
      name: "example1",
      description: "",
    };

    // ACT:
    const res = await request.post(apiUrl).send(example);

    // ASSERT
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "Example description is required."
    );
  });

  test("should return a 400 status code when posting an example with no request body", async () => {
    // ARRANGE:
    const example = {};

    // ACT:
    const res = await request.post(apiUrl).send(example);

    // ASSERT
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "Example name and description is required in request body."
    );
  });
});
