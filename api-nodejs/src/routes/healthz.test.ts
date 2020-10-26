import supertest from "supertest";

import app from "../app";

const request = supertest(app.callback());

test("GET /healthz", async () => {
  const response = await request.get("/healthz");

  expect(response.status).toBe(204);
});
