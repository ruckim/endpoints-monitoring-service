import Koa = require("koa");
import { restApiRouter } from "../rest-api";

export function mountApiVersion(version: number, app: Koa) {
  console.log("ROUTES", restApiRouter.routes());
  app.use(restApiRouter.prefix(`/v${version}`).middleware());
}
