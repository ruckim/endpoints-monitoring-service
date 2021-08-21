import "dotenv/config";
import Koa = require("koa");
import { mountApiVersion } from "./api/versions/api-v1";
import { monitoredEndpointsRouter } from "./api/monitored-endpoints";
import { config } from "../config/config";
import { auth } from "./middlewares/authentication";
const morgan = require("koa-morgan");

// TODO port to config
const PORT = config.PORT;

const app = new Koa();

app.use(auth);
app.use(morgan("tiny"));
// TODO error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: error.message,
      error,
    };
    // app.emit("error", (err: Error) => {
    //   console.error(err);
    // });
  }
});

// figure out /api/v1/
app.use(monitoredEndpointsRouter.middleware());
// mountApiVersion(1, app);

export const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
