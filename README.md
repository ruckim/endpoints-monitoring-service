# endpoints-monitoring-service

This application provides service of periodic monitoring of specified url addresses
and accessing the results of monitoring.
Service exposes REST API for following resources:

- `Monitored Endpoints` /api/v1/monitored-endpoints
- `Monitoring Results` /api/v1/monitoring-results

### Monitored Endpoints

Monitored endpoint document describes endpoint url being monitored,
monitoring frequency, date of creation, time of the last check,...

### Monitoring Results

Monitoring results document holds returned status code,
returned payload and monitoring time.

## Monitoring Process

Registered endpoints are added to monitoring process, where periodically
checked monitored endpoint URL by HTTP call. Check frequency
is specified in the Monitored Endpoint resource and results are being stored in
new resource.

API can be accessed only by API `Users` while using assigned Bearer token.
All API resources returned are linked to specific `User` calling API,
every API `User` creates its own set of `Monitored Endpoints` and can access
only belonging `Monitoring Results`.

### Using

1. run `npm install` to install all necessary dependencies
2. run `npm run knex:migrate:latest` to migrate db
3. run `npm run knex:seed:run:users` to populate DB with users
4. 
5. use API as specified

## API

Current API version is v1. Resources are all available with prefix `/api/v1/`.

## Monitored Endpoints

/monitored-endpoints

Each Monitored Endpoint consists of the following attributes:

- id [number]
- name [string]
- url [string]
- dateOfCreation [date]
- dateOfLastCheck [date], optional
- monitoredInterval [number]
- ownerId [number]

### List Monitored Endpoints

GET /monitored-endpoints

Returns list of monitored endpoints for user.

### List Monitored Endpoint by ID

GET /monitored-endpoints/:id

### Create Monitored Endpoint

POST /monitored-endpoints/:id

Creates new monitored endpoint. Following attributes are accepted:

- name [string]
- url [string]
- monitoredInterval [number]

### Update Monitored Endpoint

PATCH /monitored-endpoints/:id

Updates specified monitored endpoint with provided data.
Modifiable attributes are:

- name
- monitoredInterval

### Delete Monitored Endpoint

DELETE /monitored-endpoints/:id

Deletes monitored endpoint with id.

## Monitoring Results

/monitoring-results

Each Monitoring Result consists of the following attributes:

- id [number]
- dateOfCheck [date]
- returnedHttpStatusCode [number]
- returnedPayload [number]
- monitoredEndpointId [number]

### List Monitoring Results

GET /monitoring-results

Lists last ten monitoring results for each monitored endpoint.
