import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.text("username");
      table.text("email");
      table.text("access_token");
    })
    .createTable("monitored_endpoints", (table) => {
      table.increments("id").primary();
      table.text("name");
      table.text("url");
      table
        .timestamp("date_of_creation")
        .notNullable()
        .defaultTo(knex.fn.now());
      table.timestamp("date_of_last_check").nullable();
      table.integer("monitored_interval");
      table.integer("owner_id").references("id").inTable("users");
    })
    .createTable("monitoring_results", (table) => {
      table.increments("id");
      table.timestamp("date_of_check");
      table.integer("returned_http_status_code");
      table.text("returned_payload");
      table
        .integer("monitored_endpoint_id")
        .references("id")
        .inTable("monitored_endpoints");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("monitoring_results")
    .dropTable("monitored_endpoints")
    .dropTable("users");
}
