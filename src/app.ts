import { server } from "./server/server";
import { connection as db } from "./db/knex";
import { startMonitoring } from "./services/monitor-endpoints";

(async function () {
  db;
  server;
  startMonitoring();
})();
