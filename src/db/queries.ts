import { connection as knex } from "./knex";
import { MonitoredEndpoint } from "../data/monitored-endpoint";
import { MonitoringResult } from "../data/monitoring-result";

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
  return (
    await knex("monitored_endpoints")
      .insert(monitoredEndpointData)
      .returning("*")
  )[0];
}

export async function updateMonitoredEndpoint(
  id: number,
  userId: number,
  monitoredEndpointData: MonitoredEndpoint
) {
  return (
    await knex("monitored_endpoints")
      .where({ id, owner_id: userId })
      .update(monitoredEndpointData)
      .returning("*")
  )[0];
}

export async function deleteMonitoredEndpoint(id: number, userId: number) {
  // TODO delete linked results with deleted endpoint
  return (
    await knex("monitored_endpoints").where({ id, owner_id: userId }).del("*")
  )[0];
}

export async function getMonitoringResults(userId: number) {
  // group by endpoint
  // limit 10 per group
  // for user by id

  // TODO figure out query first

  const endpointsForUser = await knex("monitoredEndpoints")
    .select("id", "name")
    .where({ "monitoredEndpoints.ownerId": userId });

  const promises = endpointsForUser.map(async (endpoint) => {
    const tenResults = await knex("monitoringResults")
      .select("dateOfCheck", "returnedHttpStatusCode", "returnedPayload")
      .where("monitoredEndpointId", endpoint.id)
      .orderBy("monitoringResults.dateOfCheck", "desc")
      .limit(10);
    return {
      endpointId: endpoint.id,
      endpointName: endpoint.name,
      latestMonitoringResults: tenResults,
    };
  });

  return await Promise.all(promises);
}

export async function getUserIdFor(accessToken: string) {
  return (
    await knex("users").select("id").where({ access_token: accessToken })
  )[0];
}

export async function createMonitoringResult(
  data: Omit<MonitoringResult, "id">
) {
  return (await knex("monitoring_results").insert(data).returning("*"))[0];
}
