const router = require("koa-joi-router");
import { monitoredEndpointsRouter } from "./monitored-endpoints";
import { monitoringResultsRouter } from "./monitoring-results";

export const restApiRouterV1 = router().prefix("/api/v1");

restApiRouterV1.use(monitoredEndpointsRouter.middleware());
restApiRouterV1.use(monitoringResultsRouter.middleware());
