import { connection as knex } from "./knex";
import { MonitoredEndpoint } from "../data/monitored-endpoint";
import {MonitoringResult} from "../data/monitoring-result";

// TODO TS interface to knex schema - figure out mapping automatically, avoid duplication
export async function getAllMonitoredEndpoints() {
  return await knex("monitored_endpoints").select();
}

export async function getAllMonitoredEndpointsFor(userId: number) {
  return await knex("monitored_endpoints").select().where({ owner_id: userId });
}

export async function getOneMonitoredEndpointById(
  endpointId: number,
  userId: number
) {
  return (
    await knex("monitored_endpoints").where({
      id: endpointId,
      owner_id: userId,
    })
  )[0];
}

export async function createMonitoredEndpoint(
  monitoredEndpointData: MonitoredEndpoint
) {
  // move transforming data layer above
  // here comes only query, no mapping logic
  const dbInput = {
    name: monitoredEndpointData.name,
    url: monitoredEndpointData.url,
    date_of_creation: new Date(),
    date_of_last_check: null,
    monitored_interval: monitoredEndpointData.monitoredInterval,
    owner_id: monitoredEndpointData.ownerId,
  };
  return (await knex("monitored_endpoints").insert(dbInput).returning("*"))[0];
}

export async function updateMonitoredEndpoint(
  id: number,
  userId: number,
  monitoredEndpointData: MonitoredEndpoint
) {
  const dbInput = {
    name: monitoredEndpointData.name,
    monitored_interval: monitoredEndpointData.monitoredInterval,
  };
  return (
    await knex("monitored_endpoints")
      .where({ id, owner_id: userId })
      .update(dbInput)
      .returning("*")
  )[0];
}

export async function deleteMonitoredEndpoint(id: number, userId: number) {
  const result = (
    await knex("monitored_endpoints").where({ id, owner_id: userId }).del("*")
  )[0];
  console.log(result);
  return result;
}

export async function getMonitoringResults() {
  // group by endpoint
  // limit 10 per group
  // for user
  return await knex("monitoring_results").select().groupBy();
}

export async function getUserIdFor(accessToken: string) {
  return (
    await knex("users").select("id").where({ access_token: accessToken })
  )[0];
}

export async function createMonitoringResult(data: MonitoringResult) {
  const monitoringResultData = {
    date_of_check: data.dateOfCheck,
    returned_http_status_code: data.returnedHttpStatusCode,
    returnedPayload: data.returnedPayload,
    monitoredEndpointId: data.monitoredEndpointId,
  }
  return await knex("monitoring_results").insert(data);
}
