import { connection as knex } from "./knex";
import { MonitoredEndpoint } from "../data/monitored-endpoint";
import { MonitoringResult } from "../data/monitoring-result";

// TODO use queries in objects managing communication with db

export async function getAllMonitoredEndpoints() {
  try {
    return await knex("monitored_endpoints").select();
  } catch (e) {
    console.error({
      message: "Getting monitored endpoints from db failed",
      error: e,
    });
    return [];
  }
}

export async function getAllMonitoredEndpointsFor(userId: number) {
  try {
    return await knex("monitored_endpoints")
      .select()
      .where({ owner_id: userId });
  } catch (e) {
    console.error({
      message: `Getting monitored endpoints for user userId: ${userId} failed`,
      error: e,
    });
  }
}

export async function getOneMonitoredEndpointById(
  endpointId: number,
  userId: number
) {
  try {
    return (
      await knex("monitored_endpoints").where({
        id: endpointId,
        owner_id: userId,
      })
    )[0];
  } catch (e) {
    console.error({
      message: `Failed getting monitored endpoint by id ${endpointId} for user with id ${userId}`,
    });
  }
}

export async function createMonitoredEndpoint(
  monitoredEndpointData: MonitoredEndpoint
) {
  try {
    return (
      await knex("monitored_endpoints")
        .insert(monitoredEndpointData)
        .returning("*")
    )[0];
  } catch (e) {
    console.error({
      message: `Failed creating monitored endpoint`,
      error: e,
    });
  }
}

export async function updateMonitoredEndpoint(
  id: number,
  monitoredEndpointData: Partial<MonitoredEndpoint>,
  userId?: number
) {
  return (
    await knex("monitored_endpoints")
      .where({ id, ...(userId && { owner_id: userId }) })
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

  const promisesMonitoringResults = endpointsForUser.map(async (endpoint) => {
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

  return await Promise.all(promisesMonitoringResults);
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
