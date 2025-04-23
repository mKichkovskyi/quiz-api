import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";

describe("Question routes", () => {
  describe("GET /v1/questions", () => {
    test("should return bad request", async () => {
      const res = await request(app).get("/v1/questions").query({ a: 1 });
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test("should return questions with pagination", async () => {
      const res = await request(app)
        .get("/v1/questions")
        .query({ page: 1, limit: 2 });

      expect(res.status).toBe(httpStatus.OK);
      expect(res.body.data.items).toHaveLength(2);
      expect(res.body.data.items[0]).toHaveProperty(
        "title",
        "What is your preferred programming language?"
      );
    });
  });
});
