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
    const oldMonitor = runningMonitors[endpoint.id];
    oldMonitor.stop();
    delete runningMonitors[endpoint.id];
    runningMonitors[endpoint.id] = new EndpointMonitor(endpoint);
    runningMonitors[endpoint.id].start();
  });

  endpointsEventEmitter.on("deletedEndpoint", (endpointId) => {
    const oldMonitor = runningMonitors[endpointId];
    oldMonitor.stop();
    delete runningMonitors[endpointId];
  });
}
