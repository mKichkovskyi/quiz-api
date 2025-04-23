import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";

describe("UserSession routes", () => {
  describe("Post /v1/user-sessions", () => {
    test("should return bad request", async () => {
      const res = await request(app)
        .post("/v1/user-sessions")
        .send({ name: "a" });
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test("should return questions with pagination", async () => {
      const res = await request(app).post("/v1/user-sessions");

      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.body.data).toEqual({
        completed: expect.any(Boolean),
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
