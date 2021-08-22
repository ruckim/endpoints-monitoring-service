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

export const monitoredEndpointsRouter = router();

// TODO implement filter and sorting for getting resources
const routes = [
  {
    method: "GET",
    path: "/monitored-endpoints",
    handler: async (ctx: ExtendableContext) => {
      const userId = ctx.app.context.userId;
      const allMonitoredEndpoints = await getAllMonitoredEndpointsFor(userId);
      if (!allMonitoredEndpoints || !allMonitoredEndpoints.length) {
        ctx.response.status = 404;
        ctx.response.body = "Not found";
        return;
      }

      ctx.response.body = allMonitoredEndpoints;
      return;
    },
  },
  {
    method: "GET",
    path: "/monitored-endpoints/:id",
    validate: {
      params: {
        id: Joi.number(),
      },
    },
    handler: async (ctx: ExtendableContext) => {
      const userId = ctx.app.context.userId;
      const endpointId = parseInt(ctx.request.params.id);
      const monitoredEndpoint = await getOneMonitoredEndpointById(
        endpointId,
        userId
      );
      if (!monitoredEndpoint) {
        ctx.response.status = 404;
        ctx.response.body = "Not found";
        return;
      }

      ctx.response.body = monitoredEndpoint;
      return;
    },
  },
  {
    method: "POST",
    path: "/monitored-endpoints",
    validate: {
      body: {
        name: Joi.string().required(),
        url: Joi.string().required(),
        // TODO causion! duplicating information from model - test at least that this validation and model in sync
        monitoredInterval: Joi.number().optional(),
      },
      type: "json",
    },
    handler: async (ctx: ExtendableContext) => {
      const userId = ctx.app.context.userId;
      const requestMonitoredEndpointData = {
        ...ctx.request.body,
        ownerId: userId,
      };
      const createdMonitoredEndpoint = await createMonitoredEndpoint(
        requestMonitoredEndpointData
      );

      ctx.response.status = 201;
      ctx.response.body = createdMonitoredEndpoint;
      return;
    },
  },
  {
    method: "PATCH",
    path: "/monitored-endpoints/:id",
    validate: {
      params: {
        id: Joi.number(),
      },
      body: {
        name: Joi.string().optional(),
        // TODO caution! duplication information from model - test at least that this validation and model in sync
        monitoredInterval: Joi.number().optional(),
      },
      type: "json",
    },
    handler: async (ctx: ExtendableContext) => {
      const userId = ctx.app.context.userId;
      const endpointId = parseInt(ctx.request.params.id);
      const update = {
        ...ctx.request.body,
      };
      const updatedMonitoredEndpoint = await updateMonitoredEndpoint(
        endpointId,
        userId,
        update
      );
      if (!updatedMonitoredEndpoint) {
        ctx.response.status = 404;
        ctx.response.body = "Not found";
        return;
      }

      ctx.response.body = updatedMonitoredEndpoint;
      return;
    },
  },
  {
    method: "DELETE",
    path: "/monitored-endpoints/:id",
    validate: {
      params: {
        id: Joi.number(),
      },
    },
    handler: async (ctx: ExtendableContext) => {
      const userId = ctx.app.context.userId;
      const id = parseInt(ctx.request.params.id);
      const deletedMonitoredEndpoint = await deleteMonitoredEndpoint(
        id,
        userId
      );

      if (!deletedMonitoredEndpoint) {
        ctx.response.status = 404;
        ctx.response.body = "Not found";
        return;
      }

      ctx.response.body = deletedMonitoredEndpoint;
      return;
    },
  },
];

monitoredEndpointsRouter.route(routes);
