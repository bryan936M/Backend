import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import xss from "xss-clean";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import config from "./config/dev.config.js";
import DB_Connect from "./config/mongodb.config.js";
import amqConnect from "./utils/Broker/rabbitMQ.js";
import injectPublishToExchange from "./middlewares/publish.middleware.js";
import { consumeMessage } from "./utils/Broker/rabbitMQ.js";
import { service } from "./api/v1/controllers/product.controller.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import apiV1Router from "./api/v1/routes/index.js";
import { BadRequestError } from "./utils/ErrorHandling/App-errors.js";

dotenv.config();

// Connect to MongoDB
DB_Connect();

let channel = null;

// Connect to the broker
amqConnect().then(async (c) => {
  channel = c;
  await consumeMessage(channel, service);
});

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  req.channel = channel;
  next();
});

app.use(injectPublishToExchange);

app.use(compression());

app.use(helmet());

app.use(xss());

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

// Routes
app.use("/api/v1", apiV1Router);

app.get("/test-error", async (req, res, next) => {
  return next(new Error("This is an error!"));
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.all("*", (req, res) => {
  throw new BadRequestError("Route not found");
});

// Error handler
app.use(errorHandler);

export { channel };
export default app;
