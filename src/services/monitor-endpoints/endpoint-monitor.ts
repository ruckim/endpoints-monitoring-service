import got from "got";
import { MonitoredEndpoint } from "../../data/monitored-endpoint";
import { MonitoringResult } from "../../data/monitoring-result";
import {
  createMonitoringResult,
  updateMonitoredEndpoint,
} from "../../db/queries";

export class EndpointMonitor {
  endpointId: number;
  endpointOwnerId: number;
  frequencyInMs: number;
  url: string;
  lastCheckedAt?: Date;

  constructor(endpoint: MonitoredEndpoint) {
    this.endpointId = endpoint.id;
    this.endpointOwnerId = endpoint.ownerId;
    this.frequencyInMs = endpoint.monitoredInterval * 1000;
    this.url = endpoint.url;
    this.lastCheckedAt = endpoint.dateOfLastCheck;
  }

  shouldWaitForNextCheckMs(checkInterval: number, lastCheckedAt?: Date) {
    if (!lastCheckedAt) return 0;

    const nowInMs = new Date().getTime();
    const lastCheckedAtInMs = lastCheckedAt.getTime();
    const msFromLastCheck = nowInMs - lastCheckedAtInMs;
    if (msFromLastCheck >= checkInterval) {
      return 0;
    } else {
      return checkInterval - msFromLastCheck;
    }
  }

  async callEndpoint(url: string): Promise<Omit<MonitoringResult, "id">> {
    console.log(
      `Call url: ${this.url} \nendpoint id: ${this.endpointId} \nuser id ${this.endpointOwnerId}`
    );
    let endpointCheckResult;
    try {
      endpointCheckResult = await got.get(url);
      console.log(
        `url: ${this.url} \nstatusCode: ${endpointCheckResult?.statusCode} \npayload: ${endpointCheckResult?.body}`
      );
    } catch (e) {
      console.error({
        message: `Failed api call endpoint id: ${this.endpointId} \nuser id: ${this.endpointOwnerId}`,
        error: e.message,
      });
    }

    return {
      dateOfCheck: new Date(),
      returnedHttpStatusCode: endpointCheckResult?.statusCode,
      returnedPayload: endpointCheckResult?.body,
      monitoredEndpointId: this.endpointId,
    };
  }

  async saveResult(resultData: Omit<MonitoringResult, "id">) {
    await createMonitoringResult(resultData);
  }

  async updateEndpointLastCheckDate(endpointId: number, date: Date) {
    await updateMonitoredEndpoint(endpointId, { dateOfLastCheck: date });
  }

  start() {
    const msToWait = this.shouldWaitForNextCheckMs(
      this.frequencyInMs,
      this.lastCheckedAt
    );
    setTimeout(() => {
      setInterval(async () => {
        const monitoringResultData: Omit<MonitoringResult, "id"> =
          await this.callEndpoint(this.url);
        await this.saveResult(monitoringResultData);
        await this.updateEndpointLastCheckDate(
          this.endpointId,
          monitoringResultData.dateOfCheck
        );
      }, this.frequencyInMs);
    }, msToWait);
  }
}
