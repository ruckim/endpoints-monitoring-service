const router = require("koa-joi-router")
const Joi = router.Joi
import {ExtendableContext} from "koa";
import {mockMonitoredEndpoint, MonitoredEndpoint} from "../../data/monitored-endpoint";

const monitoredEndpoints: MonitoredEndpoint[] = [mockMonitoredEndpoint({id: 1}), mockMonitoredEndpoint({id: 2}), mockMonitoredEndpoint({id: 3})]

export const monitoredEndpointsRouter = router();

// TODO shorten
const routes = [
    {
        method: "GET",
        path: "/monitored-endpoints",
        validate: {
            params: {
                id: Joi.number()
            }
        },
        handler: (ctx: ExtendableContext) => {
            const allMonitoredEndpoints = monitoredEndpoints
            if (!allMonitoredEndpoints.length) {
                ctx.response.status = 404;
                ctx.response.body = "Not found"
                return
            }

            ctx.response.body = monitoredEndpoints
            return
        }
    },
    {
        method: "GET",
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
    },
    {
        method: "POST",
        path: "/monitored-endpoints",
        validate: {
            body: {
                name: Joi.string().required(),
                url: Joi.string().required(),
                // TODO causion! duplication information from model - test at least that this validation and model in sync
                monitoredInterval: Joi.number().optional()
            },
            type: "json"
        },
        handler: (ctx: ExtendableContext) => {
            const newMonitoredEndpointId = monitoredEndpoints.length + 1;
            const newMonitoredEndpoint = mockMonitoredEndpoint({id: newMonitoredEndpointId});
            monitoredEndpoints.push(newMonitoredEndpoint);

            ctx.response.status = 201
            ctx.response.body = newMonitoredEndpoint
            return
        }
    },
    {
        method: "PATCH",
        path: "/monitored-endpoints/:id",
        validate: {
            params: {
                id: Joi.number()
            },
            body: {
                name: Joi.string().optional(),
                // TODO causion! duplication information from model - test at least that this validation and model in sync
                monitoredInterval: Joi.number().optional()
            },
            type: "json"
        },
        handler: (ctx: ExtendableContext) => {
            const update = {
                ...ctx.request.body
            }
            const id = parseInt(ctx.request.params.id);
            const previousMonitoredEndpoint = monitoredEndpoints.find(me => me.id === id)
            if (!previousMonitoredEndpoint) {
                ctx.response.status = 404
                ctx.response.body = "Not found"
                return
            }

            const newMonitoredEndpoint = {
                ...previousMonitoredEndpoint,
                ...update
            }
            const monitoredEndpointIndex = monitoredEndpoints.indexOf(previousMonitoredEndpoint);
            monitoredEndpoints[monitoredEndpointIndex] = newMonitoredEndpoint;

            ctx.response.body = newMonitoredEndpoint
            return
        }
    },
    {
        method: "DELETE",
        path: "/monitored-endpoints/:id",
        validate: {
            params: {
                id: Joi.number()
            },
        },
        handler: (ctx: ExtendableContext) => {
            const id = parseInt(ctx.request.params.id);
            const monitoredEndpointToBeDeleted = monitoredEndpoints.find(me => me.id === id)
            if (!monitoredEndpointToBeDeleted) {
                ctx.response.status = 404
                ctx.response.body = "Not found"
                return
            }

            const monitoredEndpointIndex = monitoredEndpoints.indexOf(monitoredEndpointToBeDeleted);
            monitoredEndpoints.splice(monitoredEndpointIndex, 1)

            ctx.response.body = monitoredEndpointToBeDeleted
            return
        }
    }
]

monitoredEndpointsRouter.route(routes)
