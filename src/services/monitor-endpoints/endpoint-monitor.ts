import got from "got";
import { MonitoredEndpoint } from "../../data/monitored-endpoint";
import { MonitoringResult } from "../../data/monitoring-result";

export class EndpointMonitor {
  endpointId: number;
  frequencyInSeconds: number;
  url: string;

  constructor(endpoint: MonitoredEndpoint) {
    this.endpointId = endpoint.id;
    this.frequencyInSeconds = endpoint.monitoredInterval;
    this.url = endpoint.url;
  }

  async callEndpoint(url: string): Promise<Omit<MonitoringResult, "id">> {
    const result = await got.get(url);
    return {
      dateOfCheck: new Date(),
      returnedHttpStatusCode: result.statusCode,
      returnedPayload: result.body,
      monitoredEndpointId: this.endpointId,
    };
  }

  async save(resultData: Omit<MonitoringResult, "id">) {
    await
  }

  start() {
    setInterval(async () => {
      const monitoringResultData: Omit<MonitoringResult, "id"> =
        await this.callEndpoint(this.url);
      await this.save(monitoringResultData);
    }, this.frequencyInSeconds);
  }
}
