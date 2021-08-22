const router = require("koa-joi-router");
import { ExtendableContext } from "koa";
import {getMonitoringResults,
} from "../../db/queries";

export const monitoringResultsRouter = router();

monitoringResultsRouter.route({
  method: "GET",
  path: "/monitoring-results",
  handler: async (ctx: ExtendableContext) => {
    const userId = ctx.app.context.userId
    const monitoringResults = await getMonitoringResults(userId);
    if (!monitoringResults) {
      ctx.response.status = 404;
      ctx.response.body = "Not found";
      return;
    }

    ctx.response.body = monitoringResults;
    return;
  },
});
