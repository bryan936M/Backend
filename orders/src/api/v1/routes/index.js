import { Router } from "express";
import {
  newOrder,
  addProductToOrder,
  getCustomerOrder,
  getOrders,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const apiV1Router = Router();

// Define routes
apiV1Router.post("/", newOrder);
apiV1Router.get("/", getOrders);
apiV1Router.get("/:id", getCustomerOrder);
apiV1Router.post("/:id", addProductToOrder);

export default apiV1Router;
