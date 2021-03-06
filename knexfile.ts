import path from "path";
import { config } from "./src/config";

export default {
  development: {
    client: "pg",
    // TODO make knex use env vars
    // connection: config.DB_CON_STRING,
    // TODO create and use db user
    connection: "postgres://localhost/endpoints-monitoring-service",
    migrations: {
      directory: path.join(__dirname, "/src/db/migrations/"),
    },
    seeds: {
      directory: path.join(__dirname, "/src/db/seeds/"),
    },
    debug: false,
  },

  test: {
    client: "pg",
    // connection: process.env.DB_CON_STRING,
    connection: "postgres://localhost/test-endpoints-monitoring-service",
    migrations: {
      directory: path.join(__dirname, "/src/db/migrations/"),
    },
    seeds: {
      directory: path.join(__dirname, "/src/db/seeds/"),
    },
  },
};
