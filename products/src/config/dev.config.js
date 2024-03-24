import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import path from "path";
import Logger from "../utils/Logger/dev-logger.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = process.env.NODE_ENV || "development";

const envFile =
  environment === "development"
    ? path.resolve(__dirname, "../../.env.dev")
    : path.resolve(__dirname, "../../.env");

dotenv.config({
  path: envFile,
});

Logger.info(`Loaded ${environment} environment`);

export default {
    logLevel: process.env.LOGLEVEL ||'debug',
    port: process.env.PORT || 3000,
    service: process.env.SERVICE || 'product-service',
    MONGODB_USER: process.env.MONGODB_USER || '',
    MONGODB_PASS: process.env.MONGODB_PASS || '',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    MONGODB_LOCAL_PORT: process.env.MONGODB_LOCAL_PORT || 27017,
    BROKER_URL: process.env.BROKER_URL || 'amqp://localhost',
    EXCHANGE: process.env.EXCHANGE || 'Microservices',
    ORDER_SERVICE: process.env.ORDER_SERVICE || 'order-service',
    USER_SERVICE: process.env.USER_SERVICE || 'user-service',
    REDIS_URI: process.env.REDIS_URI || 'redis://localhost:6379',
    database: {
        connectionString: process.env.DEV_DATABASE_URL || `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo:${process.env.MONGODB_LOCAL_PORT}/${process.env.SERVICE}-db?authSource=admin`
}};