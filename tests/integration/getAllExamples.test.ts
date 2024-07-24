import app from "../../src/app";
import {
  seedDatabase,
  connectDatabase,
  closeDatabase,
  clearDatabase,
} from "../setup/mockDb";
import supertest from "supertest";

const request = supertest(app);
const apiUrl = "/api/example";

describe("GET all example /examples", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should get all examples and return a 200 status code", async () => {
    // ARRANGE:
    await seedDatabase();

    // ACT:
    const res = await request.get(apiUrl);

    // ASSERT
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
