// TODO ts to db schema
export const monitoredEndpoints = [
  {
    id: 1,
    name: "first endpoint",
    url: "http://localhost/first-endpoint",
    date_of_creation: new Date("2020-01-25T08:40:51.620Z"),
    date_of_last_check: new Date("2020-01-26T08:40:51.620Z"),
    monitored_interval: 30,
    owner_id: 1,
  },
  {
    id: 2,
    name: "second endpoint",
    url: "http://localhost/second-endpoint",
    date_of_creation: new Date("2020-01-27T08:40:51.620Z"),
    date_of_last_check: new Date("2020-01-28T08:40:51.620Z"),
    monitored_interval: 10,
    owner_id: 2,
  },
  {
    id: 3,
    name: "third endpoint",
    url: "http://localhost/second-endpoint",
    date_of_creation: new Date("2020-01-28T08:40:51.620Z"),
    date_of_last_check: new Date("2020-01-29T08:40:51.620Z"),
    monitored_interval: 100,
    owner_id: 2,
  },
];
