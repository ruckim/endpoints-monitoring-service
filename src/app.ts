import { server } from "./server/server";
import { connection as db } from "./db/knex";
// import {start as startMonitoringEndpoints} from './services/monitor-endpoints/index'

(async function () {
  // TODO set, config, test, connect DB
  db;
  server;
  // TODO process of checking endpoints
  // await startMonitoringEndpoints()
})();
