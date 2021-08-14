import Koa = require("koa")

const morgan = require('koa-morgan')
import {monitoredEndpointsRouter} from "./routes/monitored-endpoints";

export const app = new Koa()

// TODO auth middleware
app.use(morgan('tiny'))
// figure out /api/v1/
app.use(monitoredEndpointsRouter.middleware())

// TODO port to config
// TODO setup env
app.listen(3000)
