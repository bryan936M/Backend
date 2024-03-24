import redis, { createClient } from "redis";
import config from "../../config/dev.config.js";
import Logger from "../Logger/dev-logger.js";

let client = null;

const redisConnect = async () => {
  const url = config.REDIS_URI;
  console.log(url);
  if (!url) {
    Logger.error("Redis URL is missing");
    process.exit(1);
  }

  client = createClient({
    url,
  }).on("error", (err) => {
    Logger.error(err.message);
    process.exit(1);
  });

  await client.connect();

  Logger.info(`Connected to Redis at ${url}`);

  return client;
};

const accessClient = () => {
  if (!client) {
    Logger.error("Redis client is not connected");
    process.exit(1);
  }

  return client;
};

async function writeData(key, data, options) {
  if (accessClient()) {
    try {
      // write data to the Redis cache
      await client.set(key, data, options);
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }
}

async function readData(key) {
  let cachedValue = undefined;

  if (accessClient()) {
    // try to get the cached response from redis
    Logger.info(`Cache hit for key=${key}`);
    
    return await client.get(key);
  }

  return cachedValue;
}

export { redisConnect, accessClient, writeData, readData };
