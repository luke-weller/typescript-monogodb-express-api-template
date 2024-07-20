import request from "supertest";
import app from "../../src/app";

describe("Example Routes", () => {
  describe("GET /examples", () => {
    it("should return a list of examples", async () => {
      const response = await request(app).get("/examples");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /examples", () => {
    it("should create a new example", async () => {
      const exampleData = {
        name: "Test Example",
        description: "This is a test",
      };
      const response = await request(app).post("/examples").send(exampleData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.name).toBe(exampleData.name);
    });
  });

  describe("PUT /examples/:id", () => {
    it("should update an existing example", async () => {
      const exampleData = {
        name: "Updated Example",
        description: "This is an updated test",
      };
      // Assuming there's an example with _id of 1 for testing purposes
      const response = await request(app).put("/examples/1").send(exampleData);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(exampleData.name);
    });
  });

  describe("DELETE /examples/:id", () => {
    it("should delete an existing example", async () => {
      // Assuming there's an example with _id of 1 for testing purposes
      const response = await request(app).delete("/examples/1");
      expect(response.statusCode).toBe(204);
    });
  });
});
