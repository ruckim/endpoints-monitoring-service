import "dotenv/config";
import Koa = require("koa");
import { mountApiVersion } from "./api/versions/api-v1";
import { monitoredEndpointsRouter } from "./api/monitored-endpoints";
import { config } from "../config/config";
import { auth } from "./middlewares/authentication";
import { monitoringResultsRouter } from "./api/monitoring-results";
const { bearerToken } = require('koa-bearer-token');
const morgan = require("koa-morgan");

// TODO port to config
const PORT = config.PORT;

const app = new Koa();

app.use(bearerToken())
app.use(auth);
app.use(morgan("tiny"));

// TODO idempotency
// figure out /api/v1/
app.use(monitoredEndpointsRouter.middleware());
app.use(monitoringResultsRouter.middleware());
// mountApiVersion(1, app);

export const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
