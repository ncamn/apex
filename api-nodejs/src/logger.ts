import winston from "winston";

const { createLogger, format, transports } = winston;

export default createLogger({
  transports: [
    //
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: process.env.NODE_ENV === "test" ? "error" : "info"
    }),

    //
    new transports.File({
      filename: "errors.log",
      format: format.json(),
      level: "error"
    })
  ]
});
