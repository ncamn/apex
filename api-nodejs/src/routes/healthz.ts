// eslint-disable-next-line no-unused-vars
import Koa from "koa";

const router = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  if (ctx.method === "GET" && ctx.path === "/healthz") {
    ctx.response.status = 204;
    return;
  }

  await next();
};

export default router;
