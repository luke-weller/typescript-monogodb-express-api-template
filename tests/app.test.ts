import app from "../src/app";
import * as db from "./util/mockDb";
import supertest from "supertest";

// Create a request agent
const request = supertest(app);

describe("GET /examples", () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  describe("GET /examples", () => {
    test("should get all examples", async () => {
      // ARRANGE:
      const example = {
        name: "example1",
        description: "description1",
        createdAt: new Date(),
      };

      // ACT:
      const res = await request.get("/api/examples");

      // ASSERT
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
});
