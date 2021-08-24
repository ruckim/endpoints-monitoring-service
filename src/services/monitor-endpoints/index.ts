import { getAllMonitoredEndpoints } from "../../db/queries";
import { EndpointMonitor } from "./endpoint-monitor";
import { endpointsEventEmitter } from "../../events/monitored-endpoints";
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
  });

  endpointsEventEmitter.on("modifiedEndpoint", (endpoint) => {
    delete runningMonitors[endpoint.id];
    runningMonitors[endpoint.id] = new EndpointMonitor(endpoint);
    runningMonitors[endpoint.id].start();
  });

  endpointsEventEmitter.on("deletedEndpoint", (endpointId) => {
    delete runningMonitors[endpointId];
  });
}
