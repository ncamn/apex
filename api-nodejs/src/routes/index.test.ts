import supertest from "supertest";

import app from "../app";

const request = supertest(app.callback());

test("GET /", async () => {
  const response = await request.get("/");

  expect(response.status).toBe(200);
});
