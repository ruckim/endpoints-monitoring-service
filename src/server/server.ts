import "dotenv/config";
import Koa = require("koa");
import { config } from "../config";
import { auth } from "./middlewares/authentication";
import { restApiRouterV1 } from "./api/rest-api-v1";
const { bearerToken } = require("koa-bearer-token");
const morgan = require("koa-morgan");

const app = new Koa();

app.use(bearerToken());
app.use(auth);
app.use(morgan("tiny"));

// TODO idempotency
app.use(restApiRouterV1.middleware());

const PORT = config.PORT;
export const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
