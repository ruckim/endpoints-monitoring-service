import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../server/server";
import { connection as knex } from "../db/knex";

chai.use(chaiHttp);

const accessToken = "dcb20f8a-5657-4f1b-9f7f-ce65739b359e";
describe("app", () => {
  it("should list all monitored-endpoints on GET", (done) => {
    chai
      .request(server)
      .get("/api/v1/monitored-endpoints")
      .set("Authorization", "Bearer " + accessToken)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).exist;
        chai.expect(res.body.length).to.equal(2);
        done();
      });
  });

  it("should list one monitored-endpoints on GET by id", (done) => {
    chai
      .request(server)
      .get("/api/v1/monitored-endpoints/2")
      .set("Authorization", "Bearer " + accessToken)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).exist;
        chai.expect(res.body.id).to.equal(2);
        done();
      });
  });

  it("should create one monitored-endpoints on POST", (done) => {
    chai
      .request(server)
      .post("/api/v1/monitored-endpoints")
      .send({
        name: "testing endpoint",
        url: "http://test-url.com",
        monitoredInterval: 22,
      })
      .set("Authorization", "Bearer " + accessToken)
      .set("content-type", "application/json")
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).exist;
        chai.expect(res.body.id).exist;
        chai.expect(res.body.name).to.be.equal("testing endpoint");
        chai.expect(res.body.monitoredInterval).to.be.equal(22);
        done();
      });
  });

  it("should update one monitored-endpoints on PATCH", (done) => {
    chai
      .request(server)
      .patch("/api/v1/monitored-endpoints/3")
      .send({
        name: "new endpoint name",
      })
      .set("Authorization", "Bearer " + accessToken)
      .set("content-type", "application/json")
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).exist;
        chai.expect(res.body.id).to.be.equal(3);
        chai.expect(res.body.name).to.be.equal("new endpoint name");
        done();
      });
  });

  it("should delete monitored-endpoint on DELETE", async () => {
    const result = await chai
      .request(server)
      .delete("/api/v1/monitored-endpoints/3")
      .set("Authorization", "Bearer " + accessToken)
      .set("content-type", "application/json");

    chai.expect(result.status).to.be.equal(200);
    chai.expect(result.body).exist;
    chai.expect(result.body.id).to.be.equal(3);

    const deletedEndpoint = await knex("monitored_endpoints")
      .select()
      .where("id", 3);
    expect(deletedEndpoint).to.be.empty;
  });

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run({ specific: "01_init.ts" });
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });
});
