import { AppError } from "../utils/ErrorHandling/App-errors.js";
import Logger from "../utils/Logger/dev-logger.js";

export const errorHandler = (err, req, res, next) => {
  Logger.error(err.message, err.stack);
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      err,
    });
  }
  return res.status(500).send({
    message: "Internal Server Error",
    description: err.message,
    stack: err.stack,
  });
};
