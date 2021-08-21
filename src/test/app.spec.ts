import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../server/server";

chai.use(chaiHttp);

describe("server", () => {
  it("should list all monitored-endpoints on GET", (done) => {
    chai
      .request(server)
      .get("/monitored-endpoints")
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).exist;
        chai.expect(res.body.length).to.equal(3);
      });
    done();
  });

  // beforeEach(async () => {
  //   await knex.migrate.rollback();
  //   await knex.migrate.latest();
  //   await knex.seed.run();
  // });
  //
  // afterEach(async () => {
  //   await knex.migrate.rollback();
  // });
});
