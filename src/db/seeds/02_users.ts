import * as Knex from "knex";
import { monitoredEndpoints } from "../sample-data/monitored-endpoints";
import { users } from "../sample-data/users";
import { monitoringResults } from "../sample-data/monitoring-result";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();
  await knex("monitored_endpoints").del();
  await knex("monitoring_results").del();

  await knex("users").insert(users);
}
