import { ExtendableContext, Next } from "koa";
import { getUserIdFor } from "../../db/queries";

export async function auth(ctx: ExtendableContext, next: Next) {
    console.log("auth")
  const accessToken = ctx.request.headers.authorization;
  if (!accessToken) return (ctx.response.body = "missing access token");
  const user = await getUserIdFor(accessToken);
  if (!user) return (ctx.response.body = "user does not exist");
  ctx.app.context.userId = user.id;
  await next();
}
