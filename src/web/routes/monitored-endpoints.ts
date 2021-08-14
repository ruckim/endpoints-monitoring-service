const router = require("koa-joi-router")
const Joi = router.Joi
import {ExtendableContext} from "koa";
import {mockMonitoredEndpoint, MonitoredEndpoint} from "../../data/monitored-endpoint";

const monitoredEndpoints: MonitoredEndpoint[] = [mockMonitoredEndpoint({id: 1}), mockMonitoredEndpoint({id: 2}), mockMonitoredEndpoint({id: 3})]

export const monitoredEndpointsRouter = router();

monitoredEndpointsRouter.get("/monitored-endpoints", (ctx: ExtendableContext) => {
    ctx.response.body = monitoredEndpoints
    return
})

monitoredEndpointsRouter.route({
    method: "get",
    path: "/monitored-endpoints/:id",
    validate: {
        params: {
            id: Joi.number()
        }
    },
    handler: (ctx: ExtendableContext) => {
        const id = parseInt(ctx.request.params.id);
        const monitoredEndpoint: MonitoredEndpoint | null = monitoredEndpoints.find(me => me.id === id) || null;
        if (!monitoredEndpoint) {
            ctx.response.status = 404;
            ctx.response.body = "Not found"
            return
        }

        ctx.response.body = monitoredEndpoint
        return
    }
})

// router.post("/")
// router.put("/:id")
// router.delete("/:id")
