import { getAllMonitoredEndpoints } from "../../db/queries";
import { EndpointMonitor } from "./endpoint-monitor";
import { endpointsEventEmitter } from "../../dao/monitored-endpoints";
import { MonitoredEndpoint } from "../../data/monitored-endpoint";

export async function startMonitoring() {
  const endpoints: MonitoredEndpoint[] = await getAllMonitoredEndpoints();

  const runningMonitors: {
    [key in number]: EndpointMonitor;
  } = {};

  for (const endpoint of endpoints) {
    runningMonitors[endpoint.id] = new EndpointMonitor(endpoint);
    runningMonitors[endpoint.id].start();
  }

  endpointsEventEmitter.on("addedNewEndpoint", (endpoint) => {
    runningMonitors[endpoint.id] = new EndpointMonitor(endpoint);
    runningMonitors[endpoint.id].start();
    console.log("added", runningMonitors);
  });

  endpointsEventEmitter.on("modifiedEndpoint", (endpoint) => {
    runningMonitors[endpoint.id] = new EndpointMonitor(endpoint);
    runningMonitors[endpoint.id].start();
    console.log("modified", runningMonitors);
  });

  endpointsEventEmitter.on("deletedEndpoint", (endpointId) => {
    delete runningMonitors[endpointId];
    console.log("deleted", runningMonitors);
  });
}
