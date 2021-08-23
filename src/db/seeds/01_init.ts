import * as Knex from "knex";
import { monitoredEndpoints } from "../sample-data/monitored-endpoints";
import { users } from "../sample-data/users";
import { monitoringResults } from "../sample-data/monitoring-result";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();
  await knex("monitored_endpoints").del();
  await knex("monitoring_results").del();

  await knex("users").insert(users);
  await knex("monitored_endpoints").insert(monitoredEndpoints);
  await knex.raw(
    "SELECT setval('monitored_endpoints_id_seq', (SELECT MAX(id) from \"monitored_endpoints\"));"
  );
  await knex("monitoring_results").insert(monitoringResults);
  await knex.raw(
      "SELECT setval('monitoring_results_id_seq', (SELECT MAX(id) from \"monitoring_results\"));"
  );
}
