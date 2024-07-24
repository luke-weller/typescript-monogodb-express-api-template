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
    const res = await request.post("/api/example").send(example);

    // ASSERT
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", example.name);
    expect(res.body).toHaveProperty("description", example.description);
    expect(res.body).toHaveProperty("createdAt");
  });
});
