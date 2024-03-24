import jwt from "jsonwebtoken";
import config from "../config/dev.config.js";
import Logger from "../utils/Logger/dev-logger.js";
import { BadRequestError } from "../utils/ErrorHandling/App-errors.js";

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if token exists
  if (!token) {
    return next(new BadRequestError("Token is required"));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Check if the user has the required role
    if (decoded.role !== "admin") {
      return next(new BadRequestError("Insufficient privileges"));
    }

    // Call the next middleware or route handler
    Logger.info(`User ${decoded.email} authenticated successfully`);
    next();
  } catch (error) {
    return next(new BadRequestError("Invalid token"));
  }
};

const adminMiddleware = (req, res, next) => {
  // Check if the user has the required role
  if (req.user.role !== "admin") {
    return next(new BadRequestError("Insufficient privileges"));
  }

  // Call the next middleware or route handler
  next();
};

export {authMiddleware, adminMiddleware};
