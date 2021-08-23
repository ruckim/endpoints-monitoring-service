import { ExtendableContext, Next } from "koa";
import { getUserIdFor } from "../../db/queries";
import "koa-bearer-token/lib/index";

export async function auth(ctx: ExtendableContext, next: Next) {
  const accessToken = ctx.request.token;
  if (!accessToken) {
    ctx.response.status = 401;
    ctx.response.body = "missing access token";
    return;
  }
  const user = await getUserIdFor(accessToken);
  if (!user) return (ctx.response.body = "user does not exist");
  ctx.app.context.userId = user.id;
  await next();
}
