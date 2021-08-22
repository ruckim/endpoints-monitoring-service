// require("dotenv").config();
// import { config } from "../config/config";

import path from "path";

console.log("loaded knexfile");
export default {
  development: {
    client: "pg",
    // connection: config.DB_CON_STRING,
    // TODO create and use db user
    connection: "postgres://localhost/endpoints-monitoring-service",
    migrations: {
      directory: path.join(__dirname, "/src/db/migrations/"),
    },
    seeds: {
      directory: path.join(__dirname, "/src/db/seeds/"),
    },
    debug: true,
  },

  test: {
    client: "pg",
    // connection: process.env.DB_CON_STRING,
    connection: "postgres://localhost/test-endpoints-monitoring-service",
  },
};
