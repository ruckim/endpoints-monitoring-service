import {MonitoredEndpoint} from "../data/monitored-endpoint";


class MonitoredEndpointsDAO {

    mapToDb(monitoredEndpointData: MonitoredEndpoint){
        return {
            date_of_creation: monitoredEndpointData.dateOfCreation,
            dateOfLastCheck: monitoredEndpointData.dateOfLastCheck
        }
    }

    async create(monitoredEndpointData: MonitoredEndpoint) {

    }
}