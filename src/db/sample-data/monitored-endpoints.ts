// TODO ts to db schema
export const monitoredEndpoints = [
  {
    id: 1,
    name: "chuck noris endpoint",
    url: "https://api.chucknorris.io/jokes/random",
    date_of_creation: new Date("2020-01-25T08:40:51.620Z"),
    date_of_last_check: new Date("2020-01-26T08:40:51.620Z"),
    monitored_interval: 10,
    owner_id: 1,
  },
  {
    id: 2,
    name: "second CN endpoint",
    url: "https://api.chucknorris.io/jokes",
    date_of_creation: new Date("2020-01-27T08:40:51.620Z"),
    date_of_last_check: new Date("2020-01-28T08:40:51.620Z"),
    monitored_interval: 5,
    owner_id: 2,
  },
  {
    id: 3,
    name: "third endpoint",
    url: "http://localhost/third-endpoint",
    date_of_creation: new Date("2020-01-28T08:40:51.620Z"),
    date_of_last_check: new Date("2020-01-29T08:40:51.620Z"),
    monitored_interval: 15,
    owner_id: 2,
  },
];
