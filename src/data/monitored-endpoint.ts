import { User } from "./user";

export interface MonitoredEndpoint {
  id: number;
  name: string;
  url: string;
  dateOfCreation: Date;
  dateOfLastCheck?: Date;
  // TODO better naming - include units somehow 'seconds'
  monitoredInterval: number;
  ownerId: User["id"];
}

export function mockMonitoredEndpoint(
  data: Partial<MonitoredEndpoint>
): MonitoredEndpoint {
  return {
    id: 1,
    name: "mock-endpoint",
    url: "http://fake-mock-endpoint.com",
    dateOfCreation: new Date("2021-12-12 05:00:00"),
    dateOfLastCheck: new Date("2021-12-12 07:00:00"),
    monitoredInterval: 30,
    ownerId: 1,
    ...data,
  };
}
