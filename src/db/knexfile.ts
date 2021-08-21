// require("dotenv").config();
// import { config } from "../config/config";

console.log("knexfile");
export default {
  development: {
    client: "pg",
    // connection: config.DB_CON_STRING,
    // TODO create and use db user
    connection: "postgres://localhost/endpoints-monitoring-service",
    debug: true,
  },

  test: {
    client: "pg",
    // connection: process.env.DB_CON_STRING,
    connection: "postgres://localhost/test-endpoints-monitoring-service",
  },
};
