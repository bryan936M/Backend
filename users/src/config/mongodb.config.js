import mongoose, { mongo } from "mongoose";
import logger from "../utils/Logger/dev-logger.js";
import config from "./dev.config.js";

mongoose.set("strictQuery", true);

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

mongoose.connection.on("disconnected", () => {
  logger.info("MongoDB disconnected");
});

mongoose.connection.on("close", () => {
  logger.info("MongoDB connection closed");
});

mongoose.connection.on("error", (error) => {
  logger.error(`🤦🏻 MongoDB ERROR: ${error}`);

  process.exit(1);
});

const mongoDbConnection = async () => {
  try {
    logger.info(`Connecting to db: ${config.database.connectionString}`);
    await mongoose.connect(
      config.database.connectionString || "mongodb://localhost:27017/"
    );
    logger.info(
      `Connected to db: ${mongoose.connection.name}, host:${
        mongoose.connection.host
      }, port:${mongoose.connection.port}, authenticated:${
        mongoose.connection.readyState === 1 ? "Yes" : "No"
      }`
    );
  } catch (error) {
    logger.error(`MongoDB connection error. ${error}`);
    process.exit(1);
  }
};

export default mongoDbConnection;
