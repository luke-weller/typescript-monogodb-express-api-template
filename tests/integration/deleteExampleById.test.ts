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

describe("DELETE example by ID from the database /examples", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should delete an example by ID and return a 200 status code", async () => {
    // ARRANGE:
    await seedDatabase();
    const examples = await request.get(apiUrl);
    const exampleId = examples.body[0]._id;

    // ACT:
    const res = await request.delete(`${apiUrl}/${exampleId}`);

    // ASSERT
    expect(res.statusCode).toBe(200);
  });
});
