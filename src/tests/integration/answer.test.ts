import httpStatus from "http-status";
import request from "supertest";
import app from "../../app";

describe("Answer routes", () => {
  describe("GET /v1/answers", () => {
    test("should return bad request", async () => {
      const res = await request(app).get("/v1/answers").query({ a: 1 });
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test("should return empty array", async () => {
      const res = await request(app).get("/v1/answers");

      expect(res.status).toBe(httpStatus.OK);
      expect(res.body.data).toHaveLength(0);
    });
  });
});
