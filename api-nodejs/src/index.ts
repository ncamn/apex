import fs from "fs";
// import http2 from "http2";
import http from "https";

import app from "./app.js";
import logger from "./logger.js";

// Read the port the server should listen on from env
const port = +process.env.PORT || 80;

// Start listening for requests
/**
 * HTTP2 does not work yet because graphQL servers does not support it
 * https://github.com/apollographql/apollo-server/issues/1533
 * https://github.com/graphql/express-graphql/issues/454
 */
// const server = http2.createSecureServer({
const server = http
  .createServer(
    {
      key: fs.readFileSync("tls/localhost-privkey.pem"),
      cert: fs.readFileSync("tls/localhost-cert.pem")
    },
    app.callback()
  )
  .listen(port);

logger.info(`koa: listening on port ${port}`);

// Export the http server for testing purpose
export default server;
