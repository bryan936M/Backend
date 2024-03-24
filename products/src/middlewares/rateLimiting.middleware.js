import Logger from "../utils/Logger/dev-logger.js";
import { accessClient } from "../utils/Redis/index.js";

const rateLimiter = (options = { limit: 30, window: 60 }) => {
  return async (req, res, next) => {
    let ttl = null;

    const client = accessClient();

    if (!client) {
      Logger.error("Redis client is not connected");

      next();
    }

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const key = `rate-limiter-${ip}`;

    const requestsMade = await client.incr(key);

    if (requestsMade === 1) {
      client.expire(key, options.window);
      ttl = options.window;
    } else {
      ttl = await client.ttl(key);
    }

    if (requestsMade > options.limit) {
      return res
        .status(429)
        .send("Too many requests made from this IP, please try again later");
    }

    next();
  };
};

export default rateLimiter;
