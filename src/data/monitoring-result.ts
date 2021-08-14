import {MonitoredEndpoint} from "./monitored-endpoint";

export interface MonitoringResult {
    id: number;
    dateOfCheck: Date;
    returnedHttpStatusCode: number;
    returnedPayload: string;
    monitoredEndpointId: MonitoredEndpoint["id"];
}