import Logger from "../utils/Logger/dev-logger.js";
import hash from "object-hash";
import { accessClient, writeData, readData } from "../utils/Redis/index.js";

const makeKey = (req) => {
  const reqDataToHash = {
    params: req.params,
    body: req.body,
  };

  let key = `${req.path}@${hash.sha1(reqDataToHash)}`;

  return key;
};

const redisMiddleware = (
  options = {
    expire: 60 * 60 * 24,
  }
) => {
  return async (req, res, next) => {
    if (!accessClient()) {
      Logger.error("Redis client is not connected");

      next();
    }

    // create a key for redis
    const key = makeKey(req);

    // first check if the data is in the cache
    const cachedData = await readData(key);

    // if it is, return the cached data
    if (cachedData) {
      try {
        return res.status(200).send(JSON.parse(cachedData));
      } catch (error) {
        Logger.error("Failed to send cached data", error.message);
        return res.send(cachedData);
      }
    }

    // if it is not, wait for a response then add it to the cache
    const oldSend = res.send;
    res.send = function (data) {
      // set the function back to avoid the 'double-send' effect
      res.send = oldSend;

      // cache the response only if it is successful
      if (res.statusCode.toString().startsWith("2")) {
        Logger.info("Redis middleware caching data", key);
        writeData(key, data, options).then();
      }

      return res.send(data);
    };
    next();
  };
};
export default redisMiddleware;
