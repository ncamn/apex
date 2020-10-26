// eslint-disable-next-line no-unused-vars
import Koa from "koa";

const router = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  if (ctx.method === "GET" && ctx.path === "/") {
    ctx.response.status = 200;
    return;
  }

  await next();
};

export default router;
