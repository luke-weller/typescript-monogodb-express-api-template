import app from "../../src/app";
import { connectDatabase, closeDatabase, clearDatabase } from "../setup/mockDb";
import supertest from "supertest";

const request = supertest(app);
const apiUrl = "/api/example";

describe("UPDATE example by ID from in database /examples", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  test("should update an example by ID and return a 200 status code", async () => {
    // ARRANGE:
    const example = {
      name: "example1",
      description: "description1",
    };

    const resPost = await request.post(apiUrl).send(example);

    // ACT:
    const updatedExample = {
      name: "updatedExample1",
      description: "updatedDescription1",
    };

    const resPut = await request
      .put(`${apiUrl}/${resPost.body._id}`)
      .send(updatedExample);

    // ASSERT
    expect(resPut.statusCode).toBe(200);
    expect(resPut.body).toHaveProperty("name", updatedExample.name);
    expect(resPut.body).toHaveProperty(
      "description",
      updatedExample.description
    );
    expect(resPut.body).toHaveProperty("createdAt");
  });

  test("should return a 404 status code if example is not found", async () => {
    // ARRANGE:
    const badExampleId = "5f5b8f0b4f2b9b1d4c8f79d2";

    // ACT:
    const resPut = await request.put(`${apiUrl}/${badExampleId}`);

    // ASSERT
    expect(resPut.statusCode).toBe(404);
    expect(resPut.text).toBe("Example not found");
  });
});
