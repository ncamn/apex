import chai from "chai";
import chaiHttp from "chai-http";

import { client } from "../db.js";
import server from "../index.js";

chai.use(chaiHttp);
chai.should();

describe("/", () => {
  describe("GET", () => {
    it("should return 200", async () => {
      const res = await chai.request(server).get("/");
      res.should.have.status(200);
    });
  });
});

describe("/healthz", () => {
  describe("GET", () => {
    it("should return 204", async () => {
      const res = await chai.request(server).get("/healthz");
      res.should.have.status(204);
    });
  });
});

after(async () => {
  await client.close();
  server.close();
});
