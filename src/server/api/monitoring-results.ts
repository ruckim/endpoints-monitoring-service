const router = require("koa-joi-router");
const Joi = router.Joi;
import { ExtendableContext } from "koa";
import {
  createMonitoredEndpoint,
  deleteMonitoredEndpoint,
  getAllMonitoredEndpointsFor,
  getOneMonitoredEndpointById,
  updateMonitoredEndpoint,
} from "../../db/queries";

export const monitoringResultsRouter = router();

monitoringResultsRouter.route({
  method: "GET",
  path: "/monitored-endpoints",
  handler: async (ctx: ExtendableContext) => {
    const allMonitoredEndpoints = await getAllMonitoredEndpointsFor();
    if (!allMonitoredEndpoints || !allMonitoredEndpoints.length) {
      ctx.response.status = 404;
      ctx.response.body = "Not found";
      return;
    }

    ctx.response.body = allMonitoredEndpoints;
    return;
  },
});
