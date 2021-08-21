const router = require("koa-joi-router");
import { monitoredEndpointsRouter } from "./monitored-endpoints";

export const restApiRouter = router().prefix("/api");

restApiRouter.use(monitoredEndpointsRouter.middleware());
