import { getAllMonitoredEndpoints } from "../../db/queries";
import { EndpointMonitor } from "./endpoint-monitor";

export async function startMonitoring() {
  const endpoints = await getAllMonitoredEndpoints();

  const runningMonitors = endpoints.map((endpoint) =>
    new EndpointMonitor(endpoint).start()
  );

  // use event listener listening on event endpoint modified, which triggers loading endpoint to monitor

  // what if new endpoint is added
  // endpoint is modified/created -> load new data to monitor
  // probably invoking in some keeper
}
